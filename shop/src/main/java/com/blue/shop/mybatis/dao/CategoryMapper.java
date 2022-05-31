package com.blue.shop.mybatis.dao;

import java.util.Date;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.blue.shop.mybatis.entity.CategoryPo;

@Mapper
public interface CategoryMapper extends BaseMapper<CategoryPo> {
//    long countByExample(CategoryExample example);
//
//    int deleteByExample(CategoryExample example);
//
//    int deleteByPrimaryKey(Long id);
//
//    int insertSelective(Category row);
//
//    List<Category> selectByExampleWithBLOBs(CategoryExample example);
//
//    List<Category> selectByExample(CategoryExample example);
//
//    Category selectByPrimaryKey(Long id);
//
//    int updateByExampleSelective(@Param("row") Category row, @Param("example") CategoryExample example);
//
//    int updateByExampleWithBLOBs(@Param("row") Category row, @Param("example") CategoryExample example);
//
//    int updateByExample(@Param("row") Category row, @Param("example") CategoryExample example);
//
//    int updateByPrimaryKeySelective(Category row);
//
//    int updateByPrimaryKeyWithBLOBs(Category row);
//
//    int updateByPrimaryKey(Category row);
	
	int softDeleteById(@Param("id") Long id, @Param("isDeleted") byte isDeleted, @Param("updatedAt") Date updatedAt);
	
}