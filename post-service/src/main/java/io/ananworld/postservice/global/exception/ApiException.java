package io.ananworld.postservice.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "api exception occurs")
public class ApiException extends Exception{

    public ApiException(String message) {
        super(message);
    }

}
