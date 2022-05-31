package com.blue.shop.exception;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.blue.shop.payload.response.ApiException;
import com.blue.shop.payload.response.ExceptionResponse;
import com.blue.shop.payload.response.ResponseObject;

@RestControllerAdvice
public class RestControllerExceptionHandler {
	
	private final ResponseObject responseObject = new ResponseObject();
	
	public ResponseEntity<?> resolveException(ApiException exception) {
		String message = exception.getMessage();
		HttpStatus status = exception.getStatus();
		boolean success = exception.getSuccess();

		responseObject.setSuccess(success);
		responseObject.setMessage(message);

		return ResponseEntity
				.status(status)
				.body(responseObject);
	}

	@ExceptionHandler(UnauthorizedException.class)
	@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
	public ResponseEntity<?> resolveException(UnauthorizedException exception) {
		String message = exception.getMessage();

		responseObject.setSuccess(Boolean.FALSE);
		responseObject.setMessage(message);

		return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.body(responseObject);
	}

	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<?> resolveException(BadRequestException exception) {
		String message = exception.getMessage();

		responseObject.setSuccess(Boolean.FALSE);
		responseObject.setMessage(message);
		
		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(responseObject);
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> resolveException(ResourceNotFoundException exception) {
		String message = exception.getMessage();

		responseObject.setSuccess(Boolean.FALSE);
		responseObject.setMessage(message);

		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(responseObject);
	}

	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<?> resolveException(AccessDeniedException exception) {
		String message = exception.getMessage();

		responseObject.setSuccess(Boolean.FALSE);
		responseObject.setMessage(message);
		
		return ResponseEntity
				.status(HttpStatus.FORBIDDEN)
				.body(responseObject);
	}
	
	@ExceptionHandler(FileNotFoundException.class)
	public ResponseEntity<?> resolveException(FileNotFoundException exception) {
		String message = exception.getMessage();

		responseObject.setSuccess(Boolean.FALSE);
		responseObject.setMessage(message);
		
		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(responseObject);
	}
	
	@ExceptionHandler(FileStorageException.class)
	public ResponseEntity<?> resolveException(FileStorageException exception) {
		String message = exception.getMessage();

		responseObject.setSuccess(Boolean.FALSE);
		responseObject.setMessage(message);
		
		return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(responseObject);
	}

	/**
     * MethodArgumentNotValidException sẽ được xử lý riêng tại đây
     * Exception này của hibernate-validate bắn ra
     */
	@ExceptionHandler({ MethodArgumentNotValidException.class })
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseEntity<ExceptionResponse> resolveException(MethodArgumentNotValidException ex) {
		List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
		List<String> messages = new ArrayList<>(fieldErrors.size());
		for (FieldError error : fieldErrors) {
			messages.add(error.getField() + " - " + error.getDefaultMessage());
		}
		return new ResponseEntity<>(new ExceptionResponse(messages, HttpStatus.BAD_REQUEST.getReasonPhrase(),
				HttpStatus.BAD_REQUEST.value()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler({ MethodArgumentTypeMismatchException.class })
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseEntity<ExceptionResponse> resolveException(MethodArgumentTypeMismatchException ex) {
		String message = "Parameter '" + ex.getParameter().getParameterName() + "' must be '"
				+ Objects.requireNonNull(ex.getRequiredType()).getSimpleName() + "'";
		List<String> messages = new ArrayList<>(1);
		messages.add(message);
		return new ResponseEntity<>(new ExceptionResponse(messages, HttpStatus.BAD_REQUEST.getReasonPhrase(),
				HttpStatus.BAD_REQUEST.value()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler({ HttpRequestMethodNotSupportedException.class })
	@ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
	public ResponseEntity<ExceptionResponse> resolveException(HttpRequestMethodNotSupportedException ex) {
		String message = "Request method '" + ex.getMethod() + "' not supported. List of all supported methods - "
				+ ex.getSupportedHttpMethods();
		List<String> messages = new ArrayList<>(1);
		messages.add(message);

		return new ResponseEntity<>(new ExceptionResponse(messages, HttpStatus.METHOD_NOT_ALLOWED.getReasonPhrase(),
				HttpStatus.METHOD_NOT_ALLOWED.value()), HttpStatus.METHOD_NOT_ALLOWED);
	}

	@ExceptionHandler({ HttpMessageNotReadableException.class })
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseEntity<ExceptionResponse> resolveException(HttpMessageNotReadableException ex) {
		String message = "Please provide Request Body in valid JSON format";
		List<String> messages = new ArrayList<>(1);
		messages.add(message);
		return new ResponseEntity<>(new ExceptionResponse(messages, HttpStatus.BAD_REQUEST.getReasonPhrase(),
				HttpStatus.BAD_REQUEST.value()), HttpStatus.BAD_REQUEST);
	}

}
