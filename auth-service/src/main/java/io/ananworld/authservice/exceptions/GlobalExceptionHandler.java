package io.ananworld.authservice.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private static Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

     @ResponseBody
     @ExceptionHandler(ApiException.class)
      public ResponseEntity ApiExceptionHandler(ApiException exception) {
         Map<String, Object> body = new HashMap();
         body.put( "message", exception.getMessage());
          return ResponseEntity.status(exception.getStatus()).body(body);
      }
}

/**
 * @ControllerAdvice
 * public class ExceptionsAdvice {
 *
 *     @ResponseBody
 *     @ExceptionHandler(UnauthorizedUserException.class)
 *     public ResponseEntity unauthorizedUserExceptionHandler(UnauthorizedUserException exception) {
 *         Map body = Map.of("status", HttpStatus.UNAUTHORIZED.value(),
 *                 "error", HttpStatus.UNAUTHORIZED.getReasonPhrase(),
 *                 "message", "세션이 만료되었습니다.");
 *         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(body);
 *     }
 * }
 */