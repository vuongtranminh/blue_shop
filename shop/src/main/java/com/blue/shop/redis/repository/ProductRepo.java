package com.blue.shop.redis.repository;

import java.util.List;

import com.blue.shop.mybatis.entity.ProductPo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ProductRepo {

	public static final String HASH_KEY = "Product";

	@Autowired
	private RedisTemplate template;

	public ProductPo save(ProductPo productPo) {
		template.opsForHash().put(HASH_KEY, productPo.getId(), productPo);
		return productPo;
	}

	public List<ProductPo> findAll() {
		return template.opsForHash().values(HASH_KEY);
	}

	public ProductPo findById(int id) {
		return (ProductPo) template.opsForHash().get(HASH_KEY, id);
	}

	public String deleteById(int id) {
		template.opsForHash().delete(HASH_KEY, id);
		return "product removed !!";
	}
}
