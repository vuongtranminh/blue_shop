package com.blue.shop.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.blue.shop.validator.Phone;

public class SignupRequest {

	@NotBlank(message = "displayName is required")
	private String displayName;
	
	@NotBlank(message = "email is required")
	@Email(message = "Email address is not valid")
	private String email;
	
	@NotBlank(message = "password is required")
	private String password;
	
	@NotBlank(message = "phone is required")
	@Phone
	private String phone;

	public SignupRequest() {
	}

	public SignupRequest(@NotBlank(message = "displayName is required") String displayName,
			@NotBlank(message = "email is required") @Email(message = "Email address is not valid") String email,
			@NotBlank(message = "password is required") String password,
			@NotBlank(message = "phone is required") String phone) {
		this.displayName = displayName;
		this.email = email;
		this.password = password;
		this.phone = phone;
	}



	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

}
