package com.blue.shop.payload.response;

import java.math.BigDecimal;

public class OrderItemVo {

	private Long id;

	private Long variantId;

	private BigDecimal price;

	private Long orderId;

	private Integer quantity;

	private String itemName;

	private BigDecimal variantPrice;

	private Long productId;

	private String image;

	private String color;

	private String size;

	private Integer quantityAvailable;

	private Byte isDeletedVariant;

	public OrderItemVo() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getVariantId() {
		return variantId;
	}

	public void setVariantId(Long variantId) {
		this.variantId = variantId;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public BigDecimal getVariantPrice() {
		return variantPrice;
	}

	public void setVariantPrice(BigDecimal variantPrice) {
		this.variantPrice = variantPrice;
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

	public Integer getQuantityAvailable() {
		return quantityAvailable;
	}

	public void setQuantityAvailable(Integer quantityAvailable) {
		this.quantityAvailable = quantityAvailable;
	}

	public Byte getIsDeletedVariant() {
		return isDeletedVariant;
	}

	public void setIsDeletedVariant(Byte isDeletedVariant) {
		this.isDeletedVariant = isDeletedVariant;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}
}
