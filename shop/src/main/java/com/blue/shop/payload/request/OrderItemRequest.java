package com.blue.shop.payload.request;

import java.math.BigDecimal;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;

public class OrderItemRequest {

	@PositiveOrZero(message = "cartItemId must be positive or zero")
	private Long cartItemId;

	@PositiveOrZero(message = "variantId must be positive or zero")
	private Long variantId;

	@NotBlank(message = "price is required")
	@PositiveOrZero(message = "price must be positive or zero")
	private BigDecimal price;

	@NotBlank(message = "quantity is required")
	@PositiveOrZero(message = "quantity must be positive or zero")
	private Integer quantity;

	public OrderItemRequest() {
	}

	public OrderItemRequest(
			@NotBlank(message = "cartItemId is required") @PositiveOrZero(message = "variantId must be positive or zero") Long cartItemId,
			@NotBlank(message = "variantId is required") @PositiveOrZero(message = "variantId must be positive or zero") Long variantId,
			@NotBlank(message = "price is required") @PositiveOrZero(message = "price must be positive or zero") BigDecimal price,
			@NotBlank(message = "quantity is required") @PositiveOrZero(message = "quantity must be positive or zero") Integer quantity) {
		this.cartItemId = cartItemId;
		this.variantId = variantId;
		this.price = price;
		this.quantity = quantity;
	}

	public Long getCartItemId() {
		return cartItemId;
	}

	public void setCartItemId(Long cartItemId) {
		this.cartItemId = cartItemId;
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

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

}
