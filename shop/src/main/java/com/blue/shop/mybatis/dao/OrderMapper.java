package com.blue.shop.mybatis.dao;

import java.util.Date;
import java.util.List;

import com.blue.shop.mybatis.entity.OrderPo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.blue.shop.util.Pagination;

@Mapper
public interface OrderMapper {
//    long countByExample(OrderExample example);
//
//    int deleteByExample(OrderExample example);
//
//    int deleteByPrimaryKey(Long id);
//
//    int insert(Order row);
//
//    int insertSelective(Order row);
//
//    List<Order> selectByExample(OrderExample example);
//
//    Order selectByPrimaryKey(Long id);
//
//    int updateByExampleSelective(@Param("row") Order row, @Param("example") OrderExample example);
//
//    int updateByExample(@Param("row") Order row, @Param("example") OrderExample example);
//
//    int updateByPrimaryKeySelective(Order row);
//
//    int updateByPrimaryKey(Order row);
	
	List<OrderPo> selectAll();

	OrderPo selectById(Long id);
	
	List<OrderPo> pagination(Pagination pagination);

	Long countAll();
	
	int insert(OrderPo row);
	
	int deleteById(Long id);
	
	List<OrderPo> selectOrdersByUserId(@Param("userId") Long userId, @Param("pagination") Pagination pagination);
	
	long countByUserId(Long userId);
	
	int softDeleteById(@Param("id") Long id, @Param("isDeleted") byte isDeleted, @Param("updatedAt") Date updatedAt);
	
	int updatePaymentedById(@Param("id") Long id, @Param("paymentedAt") Date paymentedAt, @Param("updatedAt") Date updatedAt);
	
	int updateStatusOrder(@Param("id") Long id, @Param("status") Byte status, @Param("updatedAt") Date updatedAt, @Param("deliveredAt") Date deliveredAt);
	
}