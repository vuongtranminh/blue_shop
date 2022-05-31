package com.blue.shop.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN)
public class AccessDeniedException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;
	private String message;

	public AccessDeniedException(String message) {
		super(message);
		this.message = message;
	}

	public AccessDeniedException(String message, Throwable cause) {
		super(message, cause);
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
