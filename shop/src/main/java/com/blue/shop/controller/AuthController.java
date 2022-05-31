package com.blue.shop.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blue.shop.payload.request.LoginRequest;
import com.blue.shop.payload.request.SignupRequest;
import com.blue.shop.payload.response.LoginVo;
import com.blue.shop.payload.response.ResponseObject;
import com.blue.shop.service.AuthService;

/**
 * CrossOrigin bảo mật request gửi đến domain khác
 */
@RestController
@RequestMapping(path = "/api/v1/auth")
public class AuthController {

	@Autowired
	AuthService authService;
	
    /**
     * Đánh dấu object với @Valid để validator tự động kiểm tra object đó có hợp lệ hay không
     */
    /**
     * [POST] /api/v1/account/login
     * @param loginRequest
     * @return ResponseEntity
     */
	
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        String jwt = authService.authenticateUser(loginRequest);
        
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new LoginVo(jwt));
    }

    /**
     * [POST] /api/v1/account/signup
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
    	
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseObject(authService.registerUser(signupRequest), "User registered successfully!", null));
    }

}
