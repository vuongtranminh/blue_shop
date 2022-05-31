package com.blue.shop.service.impl;

import static com.blue.shop.util.AppConstants.ADDRESS;
import static com.blue.shop.util.AppConstants.ID;
import static com.blue.shop.util.AppConstants.MAX_ADDRESS_SIZE;
import static com.blue.shop.util.AppConstants.YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION;

import java.util.Date;
import java.util.List;

import com.blue.shop.mybatis.entity.AddressPo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.common.Role;
import com.blue.shop.exception.BadRequestException;
import com.blue.shop.exception.ResourceNotFoundException;
import com.blue.shop.exception.UnauthorizedException;
import com.blue.shop.mybatis.dao.AddressMapper;
import com.blue.shop.payload.request.AddressRequest;
import com.blue.shop.payload.response.AddressVo;
import com.blue.shop.payload.response.Meta;
import com.blue.shop.payload.response.PagedResponse;
import com.blue.shop.service.AddressService;
import com.blue.shop.util.Pagination;
import com.blue.shop.util.Utils;

@Service
public class AddressServiceImpl implements AddressService {
	
	@Autowired
	AddressMapper addressMapper;

	@Override
	public PagedResponse<AddressPo> getAll(int page, int size, String sort, boolean desc) {
		
		Utils.validatePageNumberAndSize(page, size);
		
		Long totalElements = addressMapper.countAll();
		
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
		
		List<AddressPo> addressPos = addressMapper.pagination(pagination);
		int totalPages = (int) Math.ceil(totalElements/(double)size);

		Meta meta = new Meta();
		meta.setPage(page);
		meta.setSize(size);
		meta.setTotalElements(totalElements);
		meta.setTotalPages(totalPages);

		return PagedResponse.from(meta, addressPos);
	}

	@Override
	public AddressVo getById(Long id, Long userId, UserPrincipal currentUser) {
		
		if(userId.equals(currentUser.getId()) || currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			
			AddressPo po = addressMapper.selectById(id);

			if (po == null) {
				throw new ResourceNotFoundException(ADDRESS, ID, id);
			}

			AddressVo vo = AddressVo.valueOf(po);

			return vo;
			
		}
		
		throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
	}

	@Override
	public AddressVo updateById(AddressRequest row, Long id, Long userId, UserPrincipal currentUser) {
		
		if(userId.equals(currentUser.getId()) || currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			
			AddressPo po = addressMapper.selectById(id);

			if (po == null) {
				throw new ResourceNotFoundException(ADDRESS, ID, id);
			}

			po.setAddress(row.getAddress());
			po.setCity(row.getCity());
			po.setCommune(row.getCommune());
			po.setDistrict(row.getDistrict());
			po.setType(row.getType());
			po.setName(row.getName());
			po.setPhone(row.getPhone());
			po.setUpdatedAt(new Date());

			addressMapper.updateById(po);

			AddressVo vo = AddressVo.valueOf(po);

			return vo;
		}
		
		throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
	}

	@Override
	public boolean deleteById(Long id, Long userId, UserPrincipal currentUser) {
		
		if(userId.equals(currentUser.getId()) || currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			addressMapper.deleteById(id);
			return true;
		}
		
		throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
	}

	@Override
	public boolean insert(AddressRequest row, Long userId, UserPrincipal currentUser) {
		
		if(userId.equals(currentUser.getId()) || currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			
			long count = addressMapper.countByUserId(userId);
			
			if(count > MAX_ADDRESS_SIZE) {
				throw new BadRequestException("User has max address size");
			}
			
			AddressPo po = new AddressPo();

			po.setAddress(row.getAddress());
			po.setCity(row.getCity());
			po.setCommune(row.getCommune());
			po.setDistrict(row.getDistrict());
			po.setName(row.getName());
			po.setPhone(row.getPhone());
			po.setType(row.getType());
			po.setUserId(currentUser.getId());
			
			addressMapper.insert(po);
			
			return true;
		}
		
		throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
	}

	@Override
	public List<AddressPo> getAddressesByUserId(Long userId, UserPrincipal currentUser) {
		if(userId.equals(currentUser.getId()) || currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			List<AddressPo> addressPos = addressMapper.selectAddressesByUserId(userId);
			return addressPos;
		}
		throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
	}

}
