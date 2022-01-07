package io.ananworld.authservice.exceptions;

import lombok.Getter;

@Getter
public class ApiException extends Exception{

    private String resultCode;

    public ApiException(String resultCode, String message) {
        super(message);
        this.resultCode = resultCode;
    }

}
