package com.blue.shop.service.impl;

import static com.blue.shop.util.AppConstants.ID;
import static com.blue.shop.util.AppConstants.VARIANT;
import static com.blue.shop.util.AppConstants.YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.common.Bin;
import com.blue.shop.common.Role;
import com.blue.shop.exception.ResourceNotFoundException;
import com.blue.shop.exception.UnauthorizedException;
import com.blue.shop.mybatis.dao.VariantMapper;
import com.blue.shop.mybatis.entity.VariantPo;
import com.blue.shop.payload.request.VariantRequest;
import com.blue.shop.payload.response.Meta;
import com.blue.shop.payload.response.PagedResponse;
import com.blue.shop.payload.response.VariantVo;
import com.blue.shop.service.VariantService;
import com.blue.shop.util.Pagination;
import com.blue.shop.util.Utils;

@Service
public class VariantServiceImpl implements VariantService {

	@Autowired
	VariantMapper variantMapper;

	@Override
	public PagedResponse<VariantPo> getAll(int page, int size, String sort, boolean desc) {
		Utils.validatePageNumberAndSize(page, size);
		
		Long totalElements = variantMapper.countAll();
		
		if (totalElements < 1) {
			Meta meta = new Meta();
			meta.setPage(page);
			meta.setSize(size);
			meta.setTotalElements(0);
			meta.setTotalPages(0);
			
			return PagedResponse.from(meta, null);
		}

		Long offset = (long) (page - 1) * size;

		Pagination pagination = new Pagination();

		pagination.setOffset(offset);
		pagination.setLimit(size);
		
		List<VariantPo> variantPos = variantMapper.pagination(pagination);
		int totalPages = (int) Math.ceil(totalElements/(double)size);

		Meta meta = new Meta();
		meta.setPage(page);
		meta.setSize(size);
		meta.setTotalElements(totalElements);
		meta.setTotalPages(totalPages);

		return PagedResponse.from(meta, variantPos);
	}

	@Override
	public VariantVo getById(Long id) {
		VariantPo variantPo = variantMapper.selectById(id);

		if (variantPo == null) {
			throw new ResourceNotFoundException(VARIANT, ID, id);
		}

		VariantVo response = VariantVo.valueOf(variantPo);

		return response;
	}

	@Override
	public VariantVo updateById(VariantRequest row, Long id, UserPrincipal currentUser) {
		
		if (!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
		}
		
		VariantPo variantPo = variantMapper.selectById(id);

		if (variantPo == null) {
			throw new ResourceNotFoundException(VARIANT, ID, id);
		}

		variantPo.setColor(row.getColor());
		variantPo.setImage(row.getImage());
		variantPo.setPrice(row.getPrice());
		variantPo.setProductId(row.getProductId());
		variantPo.setQuantity(row.getQuantity());
		variantPo.setSize(row.getSize());
		variantPo.setVariantName(row.getVariantName());
		variantPo.setUpdatedAt(new Date());

		variantMapper.updateById(variantPo);

		VariantVo response = VariantVo.valueOf(variantPo);

		return response;
	}

	@Override
	public boolean softDeleteById(Long id, UserPrincipal currentUser) {

		if (!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
		}

		variantMapper.softDeleteById(id, Bin.DELETED.getBin(), new Date());

		return true;
	}

	@Override
	public boolean restoreById(Long id, UserPrincipal currentUser) {

		if (!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
		}

		variantMapper.softDeleteById(id, Bin.ACTIVE.getBin(), new Date());

		return true;
	}

	@Override
	public boolean insert(VariantRequest row, UserPrincipal currentUser) {

		if (!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
		}

		VariantPo variantPo = new VariantPo();

		variantPo.setColor(row.getColor());
		variantPo.setImage(row.getImage());
		variantPo.setPrice(row.getPrice());
		variantPo.setProductId(row.getProductId());
		variantPo.setQuantity(row.getQuantity());
		variantPo.setSize(row.getSize());
		variantPo.setVariantName(row.getVariantName());

		variantMapper.insert(variantPo);

		return true;
	}

	@Override
	public List<VariantPo> getVariantsByProductId(Long productId) {

		List<VariantPo> variantPos = variantMapper.selectVariantsByProductId(productId);

		return variantPos;
	}

	@Override
	public boolean deleteById(Long id, UserPrincipal currentUser) {
		if (!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
		}

		variantMapper.deleteById(id);

		return true;
	}

}
