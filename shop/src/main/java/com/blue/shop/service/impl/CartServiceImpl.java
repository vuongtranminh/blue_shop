package com.blue.shop.service.impl;

import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.common.Role;
import com.blue.shop.exception.BadRequestException;
import com.blue.shop.exception.ResourceNotFoundException;
import com.blue.shop.exception.UnauthorizedException;
import com.blue.shop.mybatis.dao.ItemCartMapper;
import com.blue.shop.mybatis.dao.VariantMapper;
import com.blue.shop.mybatis.entity.ItemCartPo;
import com.blue.shop.mybatis.entity.VariantPo;
import com.blue.shop.payload.request.ItemCartRequest;
import com.blue.shop.payload.response.ItemCartVo;
import com.blue.shop.payload.response.Meta;
import com.blue.shop.payload.response.PagedResponse;
import com.blue.shop.service.CartService;
import com.blue.shop.util.Pagination;
import com.blue.shop.util.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.blue.shop.util.AppConstants.*;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    ItemCartMapper itemCartMapper;

    @Autowired
    VariantMapper variantMapper;

    @Override
    public PagedResponse<ItemCartVo> getAll(int page, int size, String sort, boolean desc) {

        Utils.validatePageNumberAndSize(page, size);

        Long totalElements = itemCartMapper.countAll();

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

        List<ItemCartVo> cart = itemCartMapper.pagination(pagination);
        int totalPages = (int) Math.ceil(totalElements/(double)size);

        Meta meta = new Meta();
        meta.setPage(page);
        meta.setSize(size);
        meta.setTotalElements(totalElements);
        meta.setTotalPages(totalPages);

        return PagedResponse.from(meta, cart);
    }

    @Override
    public ItemCartVo getById(Long id, Long userId, UserPrincipal currentUser) {

        if (userId.equals(currentUser.getId()) || currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {

            ItemCartVo vo = itemCartMapper.selectById(id);

            if (vo == null) {
                throw new ResourceNotFoundException(ITEM_CART, ID, id);
            }

            return vo;

        }

        throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);

    }

    @Override
    public boolean updateById(ItemCartRequest row, Long id, Long userId, UserPrincipal currentUser) {
        if (userId.equals(currentUser.getId()) || currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {

            ItemCartVo vo = itemCartMapper.selectById(id);

            if (vo == null) {
                throw new ResourceNotFoundException(ITEM_CART, ID, id);
            }

            if (row.getQuantity() > vo.getQuantityAvailable()) {
                throw new BadRequestException("Product has only " + vo.getQuantityAvailable());
            }

            ItemCartPo po = new ItemCartPo();
            po.setQuantity(row.getQuantity());
            po.setUserId(vo.getId());
            po.setId(vo.getId());

            itemCartMapper.updateById(po);

            return true;
        }

        throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
    }

    @Override
    public boolean deleteById(Long id, Long userId, UserPrincipal currentUser) {

        if (userId.equals(currentUser.getId()) || currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
            itemCartMapper.deleteById(id);
            return true;
        }

        throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
    }

    @Override
    public boolean insert(ItemCartRequest row, UserPrincipal currentUser) {

        VariantPo variantPo = variantMapper.selectById(row.getVariantId());

        if (variantPo == null) {
            throw new ResourceNotFoundException(VARIANT, ID, row.getVariantId());
        }

        if (row.getQuantity() > variantPo.getQuantity()) {
            throw new BadRequestException("Product has only " + variantPo.getQuantity());
        }

        Long userId = currentUser.getId();

        long count = itemCartMapper.countByUserId(userId);

        if (count > MAX_CART_SIZE) {
            throw new BadRequestException("Your cart contains up to " + MAX_CART_SIZE + " items");
        }

        ItemCartPo itemCartPo = null;

        itemCartPo = itemCartMapper.selectByUserIdAndVariantId(userId, row.getVariantId());

        if (itemCartPo == null) {
            itemCartPo = new ItemCartPo();
            itemCartPo.setQuantity(row.getQuantity());
            itemCartPo.setUserId(userId);
            itemCartPo.setVariantId(row.getVariantId());

            itemCartMapper.insert(itemCartPo);

            return true;
        }

        if (row.getQuantity() + itemCartPo.getQuantity() > variantPo.getQuantity()) {
            throw new BadRequestException("You can only add " + (variantPo.getQuantity() - itemCartPo.getQuantity()) + " products. Your cart has " + itemCartPo.getQuantity() + " this products");
        }

        itemCartPo.setQuantity(row.getQuantity() + itemCartPo.getQuantity());
        itemCartMapper.updateById(itemCartPo);

        return true;
    }

    @Override
    public List<ItemCartVo> getCart(UserPrincipal currentUser) {

        List<ItemCartVo> vos = itemCartMapper.selectCartByUserId(currentUser.getId());

        return vos;
    }

    @Override
    public long getTotalItemCart(Long userId, UserPrincipal currentUser) {
        if (userId.equals(currentUser.getId()) || currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
            return itemCartMapper.totalItemCartByUserId(userId);
        }

        throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
    }


}
