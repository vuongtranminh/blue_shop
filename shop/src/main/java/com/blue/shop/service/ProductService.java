package com.blue.shop.service;

import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.mybatis.entity.ProductPo;
import com.blue.shop.payload.request.ProductRequest;
import com.blue.shop.payload.response.PagedResponse;
import com.blue.shop.payload.response.ProductVo;

public interface ProductService {

	PagedResponse<ProductVo> getAll(int page, int size, String sort, boolean desc);
	
	ProductVo getById(Long id);
		
	ProductVo updateById(ProductRequest row, Long id, UserPrincipal currentUser);
	
	boolean softDeleteById(Long id, UserPrincipal currentUser);
	
	boolean restoreById(Long id, UserPrincipal currentUser);
	
	boolean insert(ProductRequest row, UserPrincipal currentUser);
	
	PagedResponse<ProductVo> getProductsByCategoryId(Long categoryId, int page, int size, String sort, boolean desc);
	
	boolean deleteById(Long id, UserPrincipal currentUser);
	
}
