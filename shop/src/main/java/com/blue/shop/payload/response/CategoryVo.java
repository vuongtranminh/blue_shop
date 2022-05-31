package com.blue.shop.payload.response;

import com.blue.shop.mybatis.entity.CategoryPo;

import java.util.Date;

public class CategoryVo {

	private Long id;

	private String categoryName;

	private String image;

	private Byte isDeleted;

	private Date createdAt;

	private Date updatedAt;

	private String description;

	public CategoryVo() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
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

	public static CategoryVo valueOf(CategoryPo po) {
		CategoryVo vo = new CategoryVo();

		vo.setId(po.getId());
		vo.setCategoryName(po.getCategoryName());
		vo.setCreatedAt(po.getCreatedAt());
		vo.setDescription(po.getDescription());
		vo.setImage(po.getImage());
		vo.setIsDeleted(po.getIsDeleted());
		vo.setUpdatedAt(po.getUpdatedAt());

		return vo;
	}

}
