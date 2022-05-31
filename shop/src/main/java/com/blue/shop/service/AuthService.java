package com.blue.shop.service;

import com.blue.shop.payload.request.LoginRequest;
import com.blue.shop.payload.request.SignupRequest;

public interface AuthService {

	String authenticateUser(LoginRequest loginRequest);
	
	boolean registerUser(SignupRequest signupRequest);
	
}
