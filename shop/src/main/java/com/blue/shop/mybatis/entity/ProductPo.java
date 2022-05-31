package com.blue.shop.mybatis.entity;

import java.io.Serializable;
import java.util.Date;

import com.blue.shop.common.Bin;

public class ProductPo implements Serializable {
	private Long id;

	private String productName;

	private String image01;

	private String image02;

	private Long categoryId;

	private Byte isDeleted;

	private Date createdAt;

	private Date updatedAt;

	private String description;

	private static final long serialVersionUID = 1L;

	public ProductPo() {
		Date now = new Date();
		this.isDeleted = Bin.ACTIVE.getBin();
		this.createdAt = now;
		this.updatedAt = now;
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
		this.productName = productName == null ? null : productName.trim();
	}

	public String getImage01() {
		return image01;
	}

	public void setImage01(String image01) {
		this.image01 = image01 == null ? null : image01.trim();
	}

	public String getImage02() {
		return image02;
	}

	public void setImage02(String image02) {
		this.image02 = image02 == null ? null : image02.trim();
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
		this.description = description == null ? null : description.trim();
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append(getClass().getSimpleName());
		sb.append(" [");
		sb.append("Hash = ").append(hashCode());
		sb.append(", id=").append(id);
		sb.append(", productName=").append(productName);
		sb.append(", image01=").append(image01);
		sb.append(", image02=").append(image02);
		sb.append(", categoryId=").append(categoryId);
		sb.append(", isDeleted=").append(isDeleted);
		sb.append(", createdAt=").append(createdAt);
		sb.append(", updatedAt=").append(updatedAt);
		sb.append(", description=").append(description);
		sb.append(", serialVersionUID=").append(serialVersionUID);
		sb.append("]");
		return sb.toString();
	}
}