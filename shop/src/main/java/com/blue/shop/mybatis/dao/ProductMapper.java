package com.blue.shop.mybatis.dao;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.blue.shop.mybatis.entity.ProductPo;
import com.blue.shop.util.Pagination;

@Mapper
public interface ProductMapper extends BaseMapper<ProductPo> {
//    long countByExample(ProductExample example);
//
//    int deleteByExample(ProductExample example);
//
//    int deleteByPrimaryKey(Long id);
//
//    int insert(Product row);
//
//    int insertSelective(Product row);
//
//    List<Product> selectByExampleWithBLOBs(ProductExample example);
//
//    List<Product> selectByExample(ProductExample example);
//
//    Product selectByPrimaryKey(Long id);
//
//    int updateByExampleSelective(@Param("row") Product row, @Param("example") ProductExample example);
//
//    int updateByExampleWithBLOBs(@Param("row") Product row, @Param("example") ProductExample example);
//
//    int updateByExample(@Param("row") Product row, @Param("example") ProductExample example);
//
//    int updateByPrimaryKeySelective(Product row);
//
//    int updateByPrimaryKeyWithBLOBs(Product row);
//
//    int updateByPrimaryKey(Product row);
	
	int softDeleteById(@Param("id") Long id, @Param("isDeleted") byte isDeleted, @Param("updatedAt") Date updatedAt);
    
    List<ProductPo> selectProductsByCategoryId(@Param("categoryId") Long categoryId, @Param("pagination") Pagination pagination);
    
    long countByCategoryId(Long categoryId);
}