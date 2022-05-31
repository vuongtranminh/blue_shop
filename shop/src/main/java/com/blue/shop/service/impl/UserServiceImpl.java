package com.blue.shop.service.impl;

import static com.blue.shop.util.AppConstants.ID;
import static com.blue.shop.util.AppConstants.USER;
import static com.blue.shop.util.AppConstants.YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.common.Role;
import com.blue.shop.exception.ResourceNotFoundException;
import com.blue.shop.exception.UnauthorizedException;
import com.blue.shop.mybatis.dao.UserMapper;
import com.blue.shop.mybatis.entity.UserPo;
import com.blue.shop.payload.request.UserRequest;
import com.blue.shop.payload.response.Meta;
import com.blue.shop.payload.response.PagedResponse;
import com.blue.shop.payload.response.UserVo;
import com.blue.shop.payload.response.UserSummary;
import com.blue.shop.service.UserService;
import com.blue.shop.util.Pagination;
import com.blue.shop.util.Utils;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	UserMapper userMapper;
	
	@Autowired
    PasswordEncoder passwordEncoder;

	@Override
	public UserSummary getCurrentUser(UserPrincipal currentUser) {
		UserSummary userSummary = UserSummary.valueOf(currentUser);
        return userSummary;
	}

	@Override
	public UserVo getUserProfile(Long id, UserPrincipal currentUser) {
		
		UserPo po = userMapper.selectById(id);
		
		if(po == null) {
			throw new ResourceNotFoundException(USER, ID, id);
		}
		
		if(id.equals(currentUser.getId()) || currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			
			UserVo vo = UserVo.valueOf(po);
			
			return vo;
		}
		
		throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
	}

	@Override
	public PagedResponse<UserVo> getAll(int page, int size, String sort, boolean desc) {
		
		Utils.validatePageNumberAndSize(page, size);
		
		Long totalElements = userMapper.countAll();
		
		if (totalElements < 1) {
			Meta meta = new Meta();
			meta.setPage(page);
			meta.setSize(size);
			meta.setTotalElements(0);
			meta.setTotalPages(0);
			
			return PagedResponse.from(meta, null);
		}
		
		Long offset = (long) (page-1) * size;
		
		Pagination pagination = new Pagination();
		
		pagination.setOffset(offset);
		pagination.setLimit(size);
		
		List<UserPo> userPos = userMapper.pagination(pagination);

		List<UserVo> vos = userPos.stream().map(po -> UserVo.valueOf(po)).collect(Collectors.toList());

		int totalPages = (int) Math.ceil(totalElements/(double)size);
		
		Meta meta = new Meta();
		meta.setPage(page);
		meta.setSize(size);
		meta.setTotalElements(totalElements);
		meta.setTotalPages(totalPages);
		
		return PagedResponse.from(meta, vos);
	}

	@Override
	public UserVo update(UserRequest row, Long id, UserPrincipal currentUser) {
		UserPo po = userMapper.selectById(id);
		
		if(po == null) {
			throw new ResourceNotFoundException(USER, ID, id);
		}
		
		if(po.getId().equals(currentUser.getId()) || currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {

			po.setAvatar(row.getAvatar());
			po.setBirth(row.getBirth());
			po.setCover(row.getCover());
			po.setDisplayName(row.getDisplayName());
			po.setGender(row.getGender());
			po.setPhone(row.getPhone());
			po.setUpdatedAt(new Date());
			
			userMapper.updateById(po);
			
			UserVo vo = UserVo.valueOf(po);
			
			return vo;
		}
		
		throw new UnauthorizedException("You don't have permission to update profile of: " + id);
	}

	@Override
	public boolean checkEmailAvailability(String email) {
		UserPo po = userMapper.selectByEmail(email);
		if(po == null) {
			return true;
		}
    	return false;
	}

}
