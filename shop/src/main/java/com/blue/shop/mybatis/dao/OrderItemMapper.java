package com.blue.shop.mybatis.dao;

import java.util.List;

import com.blue.shop.mybatis.entity.OrderItemPo;
import org.apache.ibatis.annotations.Mapper;

import com.blue.shop.payload.response.OrderItemVo;

@Mapper
public interface OrderItemMapper {
//    long countByExample(OrderItemExample example);
//
//    int deleteByExample(OrderItemExample example);
//
//    int deleteByPrimaryKey(Long id);
//
//    int insert(OrderItem row);
//
//    int insertSelective(OrderItem row);
//
//    List<OrderItem> selectByExample(OrderItemExample example);
//
//    OrderItem selectByPrimaryKey(Long id);
//
//    int updateByExampleSelective(@Param("row") OrderItem row, @Param("example") OrderItemExample example);
//
//    int updateByExample(@Param("row") OrderItem row, @Param("example") OrderItemExample example);
//
//    int updateByPrimaryKeySelective(OrderItem row);
//
//    int updateByPrimaryKey(OrderItem row);
	
	List<OrderItemVo> selectItemOrderByOrderId(Long orderId);
	
	int insertAll(List<OrderItemPo> items);
}