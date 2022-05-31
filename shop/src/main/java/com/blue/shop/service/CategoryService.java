package com.blue.shop.service;

import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.mybatis.entity.CategoryPo;
import com.blue.shop.payload.request.CategoryRequest;
import com.blue.shop.payload.response.CategoryVo;
import com.blue.shop.payload.response.PagedResponse;

public interface CategoryService {
	
	PagedResponse<CategoryPo> getAll(int page, int size, String sort, boolean desc);
	
	CategoryVo getById(Long id);
	
	CategoryVo updateById(CategoryRequest row, Long id, UserPrincipal currentUser);
	
	boolean softDeleteById(Long id, UserPrincipal currentUser);
	
	boolean restoreById(Long id, UserPrincipal currentUser);
	
	boolean insert(CategoryRequest row, UserPrincipal currentUser);
	
	boolean deleteById(Long id, UserPrincipal currentUser);
	
}
