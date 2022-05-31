package com.blue.shop.mybatis.dao;

import java.util.List;

import com.blue.shop.util.Pagination;

public interface BaseMapper<T> {

	List<T> selectAll();

	T selectById(Long id);
	
	int updateById(T t);
	
	List<T> pagination(Pagination pagination);

	Long countAll();
	
	int insert(T t);
	
	int deleteById(Long id);
	
}
