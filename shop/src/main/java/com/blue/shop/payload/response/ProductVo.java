package com.blue.shop.payload.response;

import com.blue.shop.mybatis.entity.ProductPo;
import com.blue.shop.mybatis.entity.VariantPo;

import java.util.Date;
import java.util.List;

public class ProductVo {

	private Long id;

	private String productName;

	private String image01;

	private String image02;

	private Long categoryId;

	private Byte isDeleted;

	private Date createdAt;

	private Date updatedAt;

	private String description;

	private List<VariantPo> variants;

	public List<VariantPo> getVariants() {
		return variants;
	}

	public void setVariants(List<VariantPo> variants) {
		this.variants = variants;
	}

	public ProductVo() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getImage01() {
		return image01;
	}

	public void setImage01(String image01) {
		this.image01 = image01;
	}

	public String getImage02() {
		return image02;
	}

	public void setImage02(String image02) {
		this.image02 = image02;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public Byte getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Byte isDeleted) {
		this.isDeleted = isDeleted;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public static ProductVo valueOf(ProductPo po, List<VariantPo> pos) {
		ProductVo vo = new ProductVo();

		vo.setId(po.getId());
		vo.setCategoryId(po.getCategoryId());
		vo.setCreatedAt(po.getCreatedAt());
		vo.setDescription(po.getDescription());
		vo.setImage01(po.getImage01());
		vo.setImage02(po.getImage02());
		vo.setIsDeleted(po.getIsDeleted());
		vo.setProductName(po.getProductName());
		vo.setUpdatedAt(po.getUpdatedAt());
		vo.setVariants(pos);

		return vo;
	}
}
