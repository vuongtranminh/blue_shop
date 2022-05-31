package com.blue.shop.service;

import java.util.List;

import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.mybatis.entity.AddressPo;
import com.blue.shop.payload.request.AddressRequest;
import com.blue.shop.payload.response.AddressVo;
import com.blue.shop.payload.response.PagedResponse;

public interface AddressService {
	
	PagedResponse<AddressPo> getAll(int page, int size, String sort, boolean desc);
	
	AddressVo getById(Long id, Long userId, UserPrincipal currentUser);
		
	AddressVo updateById(AddressRequest row, Long id, Long userId, UserPrincipal currentUser);
	
	boolean deleteById(Long id, Long userId, UserPrincipal currentUser);
	
	boolean insert(AddressRequest row, Long userId, UserPrincipal currentUser);
	
	List<AddressPo> getAddressesByUserId(Long userId, UserPrincipal currentUser);

}
