package com.blue.shop.service;


import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.mybatis.entity.UserPo;
import com.blue.shop.payload.request.UserRequest;
import com.blue.shop.payload.response.PagedResponse;
import com.blue.shop.payload.response.UserVo;
import com.blue.shop.payload.response.UserSummary;

public interface UserService {

	UserSummary getCurrentUser(UserPrincipal currentUser);
	
	UserVo getUserProfile(Long id, UserPrincipal currentUser);
	
	PagedResponse<UserVo> getAll(int page, int size, String sort, boolean desc);
	
	UserVo update(UserRequest row, Long id, UserPrincipal currentUser);
	
	boolean checkEmailAvailability(String email);

}
