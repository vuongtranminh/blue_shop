package com.blue.shop.mybatis.dao;

import java.util.List;

import com.blue.shop.mybatis.entity.ItemCartPo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.blue.shop.payload.response.ItemCartVo;
import com.blue.shop.util.Pagination;

@Mapper
public interface ItemCartMapper {
//    long countByExample(ItemCartExample example);
//
//    int deleteByExample(ItemCartExample example);
//
//    int deleteByPrimaryKey(Long id);
//
//    int insert(ItemCart row);
//
//    int insertSelective(ItemCart row);
//
//    List<ItemCart> selectByExample(ItemCartExample example);
//
//    ItemCart selectByPrimaryKey(Long id);
//
//    int updateByExampleSelective(@Param("row") ItemCart row, @Param("example") ItemCartExample example);
//
//    int updateByExample(@Param("row") ItemCart row, @Param("example") ItemCartExample example);
//
//    int updateByPrimaryKeySelective(ItemCart row);
//
//    int updateByPrimaryKey(ItemCart row);
	
	List<ItemCartPo> selectAll();

	ItemCartVo selectById(Long id);
	
	int updateById(ItemCartPo row);
	
	List<ItemCartVo> pagination(Pagination pagination);

	Long countAll();
	
	int insert(ItemCartPo row);
	
	int deleteById(Long id);
	
	List<ItemCartVo> selectCartByUserId(Long userId);
	
	long countByUserId(Long userId);
	
	ItemCartPo selectByUserIdAndVariantId(@Param("userId") Long userId, @Param("variantId") Long variantId);
	
	long totalItemCartByUserId(Long userId);

	int deleteAll(List<Long> ids);
}