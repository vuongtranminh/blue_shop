package com.blue.shop.mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.blue.shop.mybatis.entity.AddressPo;

@Mapper
public interface AddressMapper extends BaseMapper<AddressPo> {
//    long countByExample(AddressExample example);
//
//    int deleteByExample(AddressExample example);
//
//    int deleteByPrimaryKey(Long id);
//
//    int insert(Address row);
//
//    int insertSelective(Address row);
//
//    List<Address> selectByExample(AddressExample example);
//
//    Address selectByPrimaryKey(Long id);
//
//    int updateByExampleSelective(@Param("row") Address row, @Param("example") AddressExample example);
//
//    int updateByExample(@Param("row") Address row, @Param("example") AddressExample example);
//
//    int updateByPrimaryKeySelective(Address row);
//
//    int updateByPrimaryKey(Address row);
	
	long countByUserId(Long userId);
	
	List<AddressPo> selectAddressesByUserId(Long userId);
	
}