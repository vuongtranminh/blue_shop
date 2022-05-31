package com.blue.shop.payload.response;

import org.springframework.http.HttpStatus;

public class ApiException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private final HttpStatus status;
	private final boolean success;
	private final String message;

	public ApiException(HttpStatus status, String message) {
		super();
		this.status = status;
		this.success = Boolean.FALSE;
		this.message = message;
	}

	public ApiException(HttpStatus status, String message, Throwable exception) {
		super(exception);
		this.status = status;
		this.success = Boolean.FALSE;
		this.message = message;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public String getMessage() {
		return message;
	}
	
	public boolean getSuccess() {
		return success;
	}
}
