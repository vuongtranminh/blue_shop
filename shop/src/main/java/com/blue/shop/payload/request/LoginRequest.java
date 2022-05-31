package com.blue.shop.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class LoginRequest {

	@NotBlank(message = "email is required")
	@Email(message = "Email address is not valid")
	private String email;

	@NotBlank(message = "password is required")
	private String password;

	public LoginRequest() {
	}

	public LoginRequest(
			@NotBlank(message = "email is required") @Email(message = "Email address is not valid") String email,
			@NotBlank(message = "password is required") String password) {
		this.email = email;
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
