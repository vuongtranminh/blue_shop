package com.blue.shop.service.impl;

import static com.blue.shop.util.AppConstants.CATEGORY;
import static com.blue.shop.util.AppConstants.ID;
import static com.blue.shop.util.AppConstants.YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION;

import java.util.Date;
import java.util.List;

import com.blue.shop.mybatis.entity.CategoryPo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.common.Bin;
import com.blue.shop.common.Role;
import com.blue.shop.exception.ResourceNotFoundException;
import com.blue.shop.exception.UnauthorizedException;
import com.blue.shop.mybatis.dao.CategoryMapper;
import com.blue.shop.payload.request.CategoryRequest;
import com.blue.shop.payload.response.CategoryVo;
import com.blue.shop.payload.response.Meta;
import com.blue.shop.payload.response.PagedResponse;
import com.blue.shop.service.CategoryService;
import com.blue.shop.util.Pagination;
import com.blue.shop.util.Utils;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	CategoryMapper categoryMapper;

	@Override
	public PagedResponse<CategoryPo> getAll(int page, int size, String sort, boolean desc) {
		
		Utils.validatePageNumberAndSize(page, size);
		
		long totalElements = categoryMapper.countAll();
		
		if (totalElements < 1) {
			Meta meta = new Meta();
			meta.setPage(page);
			meta.setSize(size);
			meta.setTotalElements(0);
			meta.setTotalPages(0);
			
			return PagedResponse.from(meta, null);
		}
		
		long offset = (long) (page-1) * size;
		
		Pagination pagination = new Pagination();
		
		pagination.setOffset(offset);
		pagination.setLimit(size);
		
		List<CategoryPo> categories = categoryMapper.pagination(pagination);
		int totalPages = (int) Math.ceil(totalElements/(double)size);
		
		Meta meta = new Meta();
		meta.setPage(page);
		meta.setSize(size);
		meta.setTotalElements(totalElements);
		meta.setTotalPages(totalPages);
		
		return PagedResponse.from(meta, categories);
	}

	@Override
	public CategoryVo getById(Long id) {
		CategoryPo po = categoryMapper.selectById(id);
		
		if(po == null) {
			throw new ResourceNotFoundException(CATEGORY, ID, id);
		}
		
		CategoryVo vo = CategoryVo.valueOf(po);

		return vo;
	}

	@Override
	public CategoryVo updateById(CategoryRequest row, Long id, UserPrincipal currentUser) {
		
		if(!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
		}
		
		CategoryPo po = categoryMapper.selectById(id);
		
		if(po == null) {
			throw new ResourceNotFoundException(CATEGORY, ID, id);
		}

		po.setCategoryName(row.getCategoryName());
		po.setDescription(row.getDescription());
		po.setImage(row.getImage());
		po.setUpdatedAt(new Date());
		
		categoryMapper.updateById(po);
		
		CategoryVo vo = CategoryVo.valueOf(po);

		return vo;
	}

	@Override
	public boolean softDeleteById(Long id, UserPrincipal currentUser) {
		
		if(!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
		}
		
		categoryMapper.softDeleteById(id, Bin.DELETED.getBin(), new Date());
		
		return true;
	}
	
	@Override
	public boolean restoreById(Long id, UserPrincipal currentUser) {
		
		if(!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
		}
		
		categoryMapper.softDeleteById(id, Bin.ACTIVE.getBin(), new Date());
		
		return true;
	}

	@Override
	public boolean insert(CategoryRequest row, UserPrincipal currentUser) {
		
		if(!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
		}
		
		CategoryPo categoryPo = new CategoryPo();
		categoryPo.setCategoryName(row.getCategoryName());
		categoryPo.setDescription(row.getDescription());
		categoryPo.setImage(row.getImage());
		
		categoryMapper.insert(categoryPo);
		
		return true;
	}

	@Override
	public boolean deleteById(Long id, UserPrincipal currentUser) {
		if(!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
		}
		
		categoryMapper.deleteById(id);
		
		return true;
	}

}
