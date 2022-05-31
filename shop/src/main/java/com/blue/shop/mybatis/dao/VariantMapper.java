package com.blue.shop.mybatis.dao;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.blue.shop.mybatis.entity.VariantPo;

@Mapper
public interface VariantMapper extends BaseMapper<VariantPo> {
//    long countByExample(VariantExample example);
//
//    int deleteByExample(VariantExample example);
//
//    int deleteByPrimaryKey(Long id);
//
//    int insert(Variant row);
//
//    int insertSelective(Variant row);
//
//    List<Variant> selectByExample(VariantExample example);
//
//    Variant selectByPrimaryKey(Long id);
//
//    int updateByExampleSelective(@Param("row") Variant row, @Param("example") VariantExample example);
//
//    int updateByExample(@Param("row") Variant row, @Param("example") VariantExample example);
//
//    int updateByPrimaryKeySelective(Variant row);
//
//    int updateByPrimaryKey(Variant row);
    
    List<VariantPo> selectVariantsByProductId(Long productId);
    
    int softDeleteById(@Param("id") Long id, @Param("isDeleted") byte isDeleted, @Param("updatedAt") Date updatedAt);
}