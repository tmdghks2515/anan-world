package io.ananworld.apigatewayservice.filter;

import io.ananworld.apigatewayservice.config.RouterValidator;
import io.ananworld.apigatewayservice.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.apache.http.cookie.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.util.WebUtils;
import reactor.core.publisher.Mono;

import java.util.List;

@RefreshScope
@Component
@Order(1)
public class AuthenticationFilter implements GlobalFilter {

    @Autowired
    private RouterValidator routerValidator;//custom route validator
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();

        if (routerValidator.isSecured.test(request)) {
            if (this.isAuthMissing(request))
                return this.onError(exchange, "Authorization header is missing in request", HttpStatus.UNAUTHORIZED);

            final String token = this.getAuthHeader(request);

            if (jwtUtil.isInvalid(token)) {
                List<HttpCookie> cookies = request.getCookies().get("refreshToken");
                if(cookies.isEmpty())
                    return this.onError(exchange, "Authorization header is invalid", HttpStatus.UNAUTHORIZED);
                String refreshToken = cookies.get(0).getValue();
                if(jwtUtil.isInvalid(refreshToken))
                    return this.onError(exchange, "Authorization header is invalid, refreshToken is invalid too", HttpStatus.UNAUTHORIZED);
                return this.onError(exchange, "token refresh needed", HttpStatus.UNAUTHORIZED);
            }

            try {
                this.populateRequestWithHeaders(exchange, token);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return chain.filter(exchange);
    }


    /*PRIVATE*/

    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus) {
        ServerHttpResponse response = exchange.getResponse();
        if("token refresh needed".equals(err))
            response.setRawStatusCode(1001);
        else
            response.setStatusCode(httpStatus);
        return response.setComplete();
    }

    private String getAuthHeader(ServerHttpRequest request) {
        return request.getHeaders().getOrEmpty("Authorization").get(0).replace("Bearer ", "");
    }

    private boolean isAuthMissing(ServerHttpRequest request) {
        return !request.getHeaders().containsKey("Authorization");
    }

    private void populateRequestWithHeaders(ServerWebExchange exchange, String token) throws Exception {
        Claims claims = jwtUtil.getAllClaimsFromToken(token);
        exchange.getRequest().mutate()
                .header("id", String.valueOf(claims.get("id")))
                .header("role", String.valueOf(claims.get("role")))
                .build();
    }
}