package com.blue.shop.mybatis.dao;

import org.apache.ibatis.annotations.Mapper;

import com.blue.shop.mybatis.entity.RolePo;

@Mapper
public interface RoleMapper {
//    long countByExample(RoleExample example);
//
//    int deleteByExample(RoleExample example);
//
//    int deleteByPrimaryKey(Long id);
//
//    int insert(Role row);
//
//    int insertSelective(Role row);
//
//    List<Role> selectByExampleWithBLOBs(RoleExample example);
//
//    List<Role> selectByExample(RoleExample example);
//
//    Role selectByPrimaryKey(Long id);
//
//    int updateByExampleSelective(@Param("row") Role row, @Param("example") RoleExample example);
//
//    int updateByExampleWithBLOBs(@Param("row") Role row, @Param("example") RoleExample example);
//
//    int updateByExample(@Param("row") Role row, @Param("example") RoleExample example);
//
//    int updateByPrimaryKeySelective(Role row);
//
//    int updateByPrimaryKeyWithBLOBs(Role row);
//
//    int updateByPrimaryKey(Role row);
	
	RolePo selectById(Long id);
}