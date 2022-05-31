package com.blue.shop.payload.response;

import com.blue.shop.mybatis.entity.VariantPo;

import java.math.BigDecimal;
import java.util.Date;

public class VariantVo {

	private Long id;

	private String variantName;

	private BigDecimal price;

	private String image;

	private String color;

	private String size;

	private Integer quantity;

	private Long productId;

	private Byte isDeleted;

	private Date createdAt;

	private Date updatedAt;

	public VariantVo() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getVariantName() {
		return variantName;
	}

	public void setVariantName(String variantName) {
		this.variantName = variantName;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
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

	public static VariantVo valueOf(VariantPo po) {
		VariantVo vo = new VariantVo();
		vo.setId(po.getId());
		vo.setColor(po.getColor());
		vo.setCreatedAt(po.getCreatedAt());
		vo.setImage(po.getImage());
		vo.setPrice(po.getPrice());
		vo.setProductId(po.getProductId());
		vo.setQuantity(po.getQuantity());
		vo.setSize(po.getSize());
		vo.setVariantName(po.getVariantName());
		vo.setIsDeleted(po.getIsDeleted());
		vo.setUpdatedAt(po.getUpdatedAt());
		return vo;
	}

}
