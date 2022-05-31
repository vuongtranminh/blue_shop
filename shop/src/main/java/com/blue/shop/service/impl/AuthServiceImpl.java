package com.blue.shop.service.impl;

import com.blue.shop.mybatis.entity.UserPo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.blue.shop.auth.TokenProvider;
import com.blue.shop.common.Role;
import com.blue.shop.exception.BadRequestException;
import com.blue.shop.mybatis.dao.RoleMapper;
import com.blue.shop.mybatis.dao.UserMapper;
import com.blue.shop.payload.request.LoginRequest;
import com.blue.shop.payload.request.SignupRequest;
import com.blue.shop.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService{
	
	@Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    UserMapper userMapper;
    
    @Autowired
    RoleMapper roleMapper;

	@Override
	public String authenticateUser(LoginRequest loginRequest) {
		
		Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        // Nếu không xảy ra exception tức là thông tin hợp lệ
        // Set thông tin authentication vào Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Trả về jwt cho người dùng.
        String jwt = tokenProvider.generateToken(authentication);
		return jwt;
	}

	@Override
	public boolean registerUser(SignupRequest signupRequest) {

        if(existsByEmail(signupRequest.getEmail())) {
        	throw new BadRequestException("Email is already taken!");
        }

        UserPo userPo = new UserPo();
        userPo.setEmail(signupRequest.getEmail());
        userPo.setDisplayName(signupRequest.getDisplayName());
        userPo.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        userPo.setPhone(signupRequest.getPhone());
        userPo.setRoleId(Role.ROLE_USER.getRole());

        userMapper.insert(userPo);
        
        return true;
	}
	
	public boolean existsByEmail(String email) {	
		UserPo userPo = userMapper.selectByEmail(email);
		if(userPo == null) {
			return false;
		}
    	return true;
    }

}
