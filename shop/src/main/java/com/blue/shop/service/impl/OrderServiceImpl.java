package com.blue.shop.service.impl;

import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.common.Bin;
import com.blue.shop.common.OrderStatus;
import com.blue.shop.common.Role;
import com.blue.shop.exception.AppException;
import com.blue.shop.exception.BadRequestException;
import com.blue.shop.exception.ResourceNotFoundException;
import com.blue.shop.exception.UnauthorizedException;
import com.blue.shop.mybatis.dao.ItemCartMapper;
import com.blue.shop.mybatis.dao.OrderItemMapper;
import com.blue.shop.mybatis.dao.OrderMapper;
import com.blue.shop.mybatis.dao.VariantMapper;
import com.blue.shop.mybatis.entity.OrderItemPo;
import com.blue.shop.mybatis.entity.OrderPo;
import com.blue.shop.mybatis.entity.VariantPo;
import com.blue.shop.payload.request.OrderItemRequest;
import com.blue.shop.payload.request.OrderRequest;
import com.blue.shop.payload.request.VariantRequest;
import com.blue.shop.payload.response.*;
import com.blue.shop.service.OrderService;
import com.blue.shop.util.Pagination;
import com.blue.shop.util.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.blue.shop.util.AppConstants.*;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderMapper orderMapper;

    @Autowired
    OrderItemMapper orderItemMapper;

    @Autowired
    ItemCartMapper itemCartMapper;

    @Autowired
    VariantMapper variantMapper;

    @Override
    public PagedResponse<OrderVo> getAll(int page, int size, String sort, boolean desc) {

        Utils.validatePageNumberAndSize(page, size);

        Long totalElements = orderMapper.countAll();

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

        List<OrderPo> orderPos = orderMapper.pagination(pagination);
        List<OrderVo> orderVos = orderPos.stream().map(orderPo -> {
            List<OrderItemVo> orderItemVos = orderItemMapper.selectItemOrderByOrderId(orderPo.getId());
            return OrderVo.valueOf(orderPo, orderItemVos);
        }).collect(Collectors.toList());
        Integer totalPages = Math.round((totalElements / size) * 10);

        Meta meta = new Meta();
        meta.setPage(page);
        meta.setSize(size);
        meta.setTotalElements(totalElements);
        meta.setTotalPages(totalPages);

        return PagedResponse.from(meta, orderVos);

    }

    @Override
    public OrderVo getById(Long id, Long userId, UserPrincipal currentUser) {

        if (userId.equals(currentUser.getId()) || currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {

            OrderPo po = orderMapper.selectById(id);

            if (po == null) {
                throw new ResourceNotFoundException(ORDER, ID, id);
            }

            List<OrderItemVo> items = orderItemMapper.selectItemOrderByOrderId(po.getId());

            if (items == null || items.size() < 1) {
                throw new ResourceNotFoundException(ORDER, ID, id);
            }

            OrderVo vo = OrderVo.valueOf(po, items);
            return vo;

        }

        throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);

    }

    @Override
    public boolean deleteById(Long id, Long userId, UserPrincipal currentUser) {

        if (!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
            throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
        }

        orderMapper.deleteById(id);

        return true;
    }

    @Override
    @Transactional(rollbackFor = {AppException.class, Exception.class, Throwable.class})
    public boolean insert(OrderRequest row, UserPrincipal currentUser) {

        OrderPo orderPo = new OrderPo();

        orderPo.setAddress(row.getAddress());
        orderPo.setBuyerId(currentUser.getId());
        orderPo.setBuyerName(row.getBuyerName());
        orderPo.setPhone(row.getPhone());
        orderPo.setTotalPrice(row.getTotalPrice());
        orderPo.setCity(row.getCity());
        orderPo.setDistrict(row.getDistrict());
        orderPo.setCommune(row.getCommune());
        orderPo.setNote(row.getNote());

        int record = orderMapper.insert(orderPo);

        if (record != 1) {
            throw new AppException("Insert to order fail");
        }

        OrderItemPo item = new OrderItemPo();
        List<Long> idsDeleteItemCart = new ArrayList<Long>();
        VariantPo variantPo = new VariantPo();

        List<OrderItemPo> items = new ArrayList<>();

        for(OrderItemRequest itemRequest : row.getItems()) {
            idsDeleteItemCart.add(itemRequest.getCartItemId());
            item.setOrderId(orderPo.getId());
            item.setPrice(itemRequest.getPrice());
            item.setQuantity(itemRequest.getQuantity());
            item.setVariantId(itemRequest.getVariantId());

            variantPo = variantMapper.selectById(itemRequest.getVariantId());
            variantPo.setQuantity(variantPo.getQuantity() - itemRequest.getQuantity());
            variantPo.setUpdatedAt(new Date());

            variantMapper.updateById(variantPo);

            items.add(item);
        }

//        List<OrderItemPo> items = row.getItems().stream().map(itemRequest -> {
//            idsDeleteItemCart.add(itemRequest.getCartItemId());
//            item.setOrderId(orderPo.getId());
//            item.setPrice(itemRequest.getPrice());
//            item.setQuantity(itemRequest.getQuantity());
//            item.setVariantId(itemRequest.getVariantId());
//
//            return item;
//        }).collect(Collectors.toList());

        int totalRecord = orderItemMapper.insertAll(items);

        if (totalRecord != row.getItems().size()) {
            throw new AppException("Insert to order item fail");
        }

        int totalDeletedRecord = itemCartMapper.deleteAll(idsDeleteItemCart);

        if(totalDeletedRecord != idsDeleteItemCart.size()) {
            throw new AppException("Insert to order item fail");
        }

        return true;
    }

    @Override
    public boolean softDeleteById(Long id, UserPrincipal currentUser) {

        if (!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
            throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
        }

        orderMapper.softDeleteById(id, Bin.DELETED.getBin(), new Date());

        return true;
    }

    @Override
    public boolean restoreById(Long id, UserPrincipal currentUser) {

        if (!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
            throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
        }

        orderMapper.softDeleteById(id, Bin.ACTIVE.getBin(), new Date());

        return true;

    }

    @Override
    public PagedResponse<OrderVo> getOrdersByUserId(Long userId, UserPrincipal currentUser, int page, int size,
                                                    String sort, boolean desc) {
        Utils.validatePageNumberAndSize(page, size);

        Long totalElements = orderMapper.countByUserId(userId);

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

        List<OrderPo> orderPos = orderMapper.selectOrdersByUserId(userId, pagination);

        List<OrderVo> orderVos = orderPos.stream().map(orderPo -> {
            List<OrderItemVo> orderItemVos = orderItemMapper.selectItemOrderByOrderId(orderPo.getId());
            return OrderVo.valueOf(orderPo, orderItemVos);
        }).collect(Collectors.toList());

        int totalPages = (int) Math.ceil(totalElements/(double)size);

        Meta meta = new Meta();
        meta.setPage(page);
        meta.setSize(size);
        meta.setTotalElements(totalElements);
        meta.setTotalPages(totalPages);

        return PagedResponse.from(meta, orderVos);
    }

    @Override
    public boolean updatePaymentedById(Long id, UserPrincipal currentUser) {

        if (!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
            throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
        }

        Date now = new Date();

        orderMapper.updatePaymentedById(id, now, now);

        return true;
    }

    @Override
    public boolean updateStatusOrder(Long id, Long userId, UserPrincipal currentUser, byte status) {

        if (userId.equals(currentUser.getId()) || currentUser.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getDescription()))) {
            OrderPo orderPo = orderMapper.selectById(id);

            if (orderPo == null) {
                throw new ResourceNotFoundException(ORDER, ID, id);
            }

            Date now = null;

            if (status == OrderStatus.CANCEL_ORDER.getStatus()) {
                if (orderPo.getStatus() != OrderStatus.ACCEPTING.getStatus())
                    throw new BadRequestException("You can't cancel order when order status different Accepting");
                now = new Date();
                orderMapper.updateStatusOrder(id, status, now, null);

                return true;
            }

            if (status == OrderStatus.DELIVERING.getStatus()) {
                if (orderPo.getStatus() != OrderStatus.ACCEPTING.getStatus()) {
                    throw new BadRequestException("You need Accepting before Delivering");
                }

                now = new Date();
                orderMapper.updateStatusOrder(id, status, now, null);

                return true;
            }

            if (status == OrderStatus.DELIVERED.getStatus()) {
                if (orderPo.getStatus() != OrderStatus.DELIVERING.getStatus()) {
                    throw new BadRequestException("You need Accepting before Delivering");
                }
                if (orderPo.getPaymentedAt() == null) {
                    throw new BadRequestException("Order need paymented");
                }

                now = new Date();
                orderMapper.updateStatusOrder(id, status, now, now);

                return true;
            }

            throw new BadRequestException("Status is not valid");
        }

        throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
    }

}
