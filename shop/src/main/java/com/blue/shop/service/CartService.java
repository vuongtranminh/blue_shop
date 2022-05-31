package com.blue.shop.service;

import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.payload.request.ItemCartRequest;
import com.blue.shop.payload.response.ItemCartVo;
import com.blue.shop.payload.response.PagedResponse;

import java.util.List;

public interface CartService {

	PagedResponse<ItemCartVo> getAll(int page, int size, String sort, boolean desc);
	
	ItemCartVo getById(Long id, Long userId, UserPrincipal currentUser);

	boolean updateById(ItemCartRequest row, Long id, Long userId, UserPrincipal currentUser);
	
	boolean deleteById(Long id, Long userId, UserPrincipal currentUser);
	
	boolean insert(ItemCartRequest row, UserPrincipal currentUser);
	
	List<ItemCartVo> getCart(UserPrincipal currentUser);
	
	long getTotalItemCart(Long userId, UserPrincipal currentUser);
	
}
