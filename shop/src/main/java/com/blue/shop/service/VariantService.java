package com.blue.shop.service;

import java.util.List;

import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.mybatis.entity.VariantPo;
import com.blue.shop.payload.request.VariantRequest;
import com.blue.shop.payload.response.PagedResponse;
import com.blue.shop.payload.response.VariantVo;

public interface VariantService {

	PagedResponse<VariantPo> getAll(int page, int size, String sort, boolean desc);

	VariantVo getById(Long id);

	VariantVo updateById(VariantRequest row, Long id, UserPrincipal currentUser);

	boolean softDeleteById(Long id, UserPrincipal currentUser);

	boolean restoreById(Long id, UserPrincipal currentUser);

	boolean insert(VariantRequest row, UserPrincipal currentUser);

	List<VariantPo> getVariantsByProductId(Long productId);
	
	boolean deleteById(Long id, UserPrincipal currentUser);

}
