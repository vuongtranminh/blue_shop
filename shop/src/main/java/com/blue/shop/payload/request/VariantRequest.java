package com.blue.shop.payload.request;

import java.math.BigDecimal;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;

public class VariantRequest {

	@NotBlank(message = "variantName is required")
	private String variantName;

	@PositiveOrZero(message = "price must be positive or zero")
	private BigDecimal price;

	private String image;

	@NotBlank(message = "color is required")
	private String color;

	@NotBlank(message = "size is required")
	private String size;

	@PositiveOrZero(message = "quantity must be positive or zero")
	private Integer quantity;

	@PositiveOrZero(message = "productId must be positive or zero")
	private Long productId;

	public VariantRequest() {
	}

	public VariantRequest(@NotBlank(message = "productName is required") String variantName,
			@PositiveOrZero(message = "price must be positive or zero") BigDecimal price, String image,
			@NotBlank(message = "color is required") String color, @NotBlank(message = "size is required") String size,
			@NotBlank(message = "quantity is required") @PositiveOrZero(message = "quantity must be positive or zero") Integer quantity,
			@NotBlank(message = "productId is required") @PositiveOrZero(message = "productId must be positive or zero") Long productId) {
		this.variantName = variantName;
		this.price = price;
		this.image = image;
		this.color = color;
		this.size = size;
		this.quantity = quantity;
		this.productId = productId;
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

}
