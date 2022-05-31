package com.blue.shop.service;

import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.payload.request.OrderRequest;
import com.blue.shop.payload.response.OrderVo;
import com.blue.shop.payload.response.PagedResponse;

public interface OrderService {
	
	PagedResponse<OrderVo> getAll(int page, int size, String sort, boolean desc);
	
	OrderVo getById(Long id, Long userId, UserPrincipal currentUser);
	
	boolean deleteById(Long id, Long userId, UserPrincipal currentUser);
	
	boolean insert(OrderRequest row, UserPrincipal currentUser);
	
	boolean softDeleteById(Long id, UserPrincipal currentUser);
	
	boolean restoreById(Long id, UserPrincipal currentUser);
	
	boolean updatePaymentedById(Long id, UserPrincipal currentUser);
	
	boolean updateStatusOrder(Long id, Long userId, UserPrincipal currentUser, byte status);
	
	PagedResponse<OrderVo> getOrdersByUserId(Long userId, UserPrincipal currentUser, int page, int size, String sort, boolean desc);

}
