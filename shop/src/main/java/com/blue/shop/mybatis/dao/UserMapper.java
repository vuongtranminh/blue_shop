package com.blue.shop.mybatis.dao;

import java.util.Date;

import com.blue.shop.mybatis.entity.UserPo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper extends BaseMapper<UserPo> {
//    long countByExample(UserExample example);
//
//    int deleteByExample(UserExample example);
//
//    int deleteByPrimaryKey(Long id);
//
//    int insert(User row);
//
//    int insertSelective(User row);
//
//    List<User> selectByExample(UserExample example);
//
//    User selectByPrimaryKey(Long id);
//
//    int updateByExampleSelective(@Param("row") User row, @Param("example") UserExample example);
//
//    int updateByExample(@Param("row") User row, @Param("example") UserExample example);
//
//    int updateByPrimaryKeySelective(User row);
//
//    int updateByPrimaryKey(User row);
	
	UserPo selectByEmail(String email);
	
	int softDeleteById(@Param("id") Long id, @Param("isDeleted") byte isDeleted, @Param("updatedAt") Date updatedAt);
}