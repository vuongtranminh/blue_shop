package com.blue.shop.service.impl;

import static com.blue.shop.util.AppConstants.ID;
import static com.blue.shop.util.AppConstants.PRODUCT;
import static com.blue.shop.util.AppConstants.YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.blue.shop.mybatis.dao.VariantMapper;
import com.blue.shop.mybatis.entity.ProductPo;
import com.blue.shop.mybatis.entity.VariantPo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.common.Bin;
import com.blue.shop.common.Role;
import com.blue.shop.exception.ResourceNotFoundException;
import com.blue.shop.exception.UnauthorizedException;
import com.blue.shop.mybatis.dao.ProductMapper;
import com.blue.shop.payload.request.ProductRequest;
import com.blue.shop.payload.response.Meta;
import com.blue.shop.payload.response.PagedResponse;
import com.blue.shop.payload.response.ProductVo;
import com.blue.shop.service.ProductService;
import com.blue.shop.util.Pagination;
import com.blue.shop.util.Utils;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	ProductMapper productMapper;

	@Autowired
	VariantMapper variantMapper;

	@Override
	public PagedResponse<ProductVo> getAll(int page, int size, String sort, boolean desc) {

		Utils.validatePageNumberAndSize(page, size);
		
		Long totalElements = productMapper.countAll();
		
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
		
		List<ProductPo> productPos = productMapper.pagination(pagination);
		List<ProductVo> productVos = productPos.stream().map(productPo -> {
			List<VariantPo> variantPos = variantMapper.selectVariantsByProductId(productPo.getId());
			return ProductVo.valueOf(productPo, variantPos);
		}).collect(Collectors.toList());
		int totalPages = (int) Math.ceil(totalElements/(double)size);

		Meta meta = new Meta();
		meta.setPage(page);
		meta.setSize(size);
		meta.setTotalElements(totalElements);
		meta.setTotalPages(totalPages);

		return PagedResponse.from(meta, productVos);
	}

	@Override
	public ProductVo getById(Long id) {
		ProductPo productPo = productMapper.selectById(id);

		if (productPo == null) {
			throw new ResourceNotFoundException(PRODUCT, ID, id);
		}

		List<VariantPo> variantPos = variantMapper.selectVariantsByProductId(id);

		ProductVo response = ProductVo.valueOf(productPo, variantPos);

		return response;
	}

	@Override
	public ProductVo updateById(ProductRequest row, Long id, UserPrincipal currentUser) {
		
		if (!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
		}
		
		ProductPo productPo = productMapper.selectById(id);

		if (productPo == null) {
			throw new ResourceNotFoundException(PRODUCT, ID, id);
		}

		productPo.setCategoryId(row.getCategoryId());
		productPo.setDescription(row.getDescription());
		productPo.setImage01(row.getImage01());
		productPo.setImage02(row.getImage02());
		productPo.setProductName(row.getProductName());
		productPo.setUpdatedAt(new Date());

		productMapper.updateById(productPo);

		ProductVo response = ProductVo.valueOf(productPo, null);

		return response;
	}

	@Override
	public boolean softDeleteById(Long id, UserPrincipal currentUser) {
		
		if(!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
		}
		
		productMapper.softDeleteById(id, Bin.DELETED.getBin(), new Date());
		
		return true;
	}

	@Override
	public boolean restoreById(Long id, UserPrincipal currentUser) {
		
		if(!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
		}
		
		productMapper.softDeleteById(id, Bin.ACTIVE.getBin(), new Date());
		
		return true;
	}

	@Override
	public boolean insert(ProductRequest row, UserPrincipal currentUser) {
		
		if(!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
		}
		
		ProductPo productPo = new ProductPo();
		
		productPo.setCategoryId(row.getCategoryId());
		productPo.setDescription(row.getDescription());
		productPo.setImage01(row.getImage01());
		productPo.setImage02(row.getImage02());
		productPo.setProductName(row.getProductName());
		
		productMapper.insert(productPo);
		
		return true;
	}

	@Override
	public PagedResponse<ProductVo> getProductsByCategoryId(Long categoryId, int page, int size, String sort, boolean desc) {

		Utils.validatePageNumberAndSize(page, size);
		
		Long totalElements = productMapper.countByCategoryId(categoryId);
		
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

		List<ProductPo> productPos = productMapper.selectProductsByCategoryId(categoryId, pagination);
		List<ProductVo> productVos = productPos.stream().map(productPo -> {
			List<VariantPo> variantPos = variantMapper.selectVariantsByProductId(productPo.getId());
			return ProductVo.valueOf(productPo, variantPos);
		}).collect(Collectors.toList());
		int totalPages = (int) Math.ceil(totalElements/(double)size);

		Meta meta = new Meta();
		meta.setPage(page);
		meta.setSize(size);
		meta.setTotalElements(totalElements);
		meta.setTotalPages(totalPages);

		return PagedResponse.from(meta, productVos);
		
	}

	@Override
	public boolean deleteById(Long id, UserPrincipal currentUser) {
		
		if(!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
			throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
		}
		
		productMapper.deleteById(id);
		
		return true;
	}

}
