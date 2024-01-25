package com.example.storeapi.exception;

import com.example.storeapi.dto.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler({ResourceNotFoundException.class})
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException exception) {
        return new ResponseEntity<>(
                ErrorResponse.builder()
                        .error("Resource Not found")
                        .message(exception.getMessage())
                        .build()
                , HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({ResourceAlreadyExistsException.class})
    public ResponseEntity<ErrorResponse> handleResourceAlreadyExistsException(ResourceAlreadyExistsException exception) {
        return new ResponseEntity<>(
                ErrorResponse.builder()
                        .error("Resource Already Exists")
                        .message(exception.getMessage())
                        .build()
                , HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({AuthenticationException.class})
    public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException exception) {
        return new ResponseEntity<>(
                ErrorResponse.builder()
                        .error("Authentication Failed")
                        .message(exception.getMessage())
                        .build()
                , HttpStatus.FORBIDDEN);
    }
}
