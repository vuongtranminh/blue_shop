package com.blue.shop.payload.request;

import javax.validation.constraints.PositiveOrZero;

public class ItemCartRequest {

	@PositiveOrZero(message = "quantity must be positive or zero")
	private Integer quantity;

	@PositiveOrZero(message = "variantId must be positive or zero")
	private Long variantId;

	public ItemCartRequest() {
	}

	public ItemCartRequest(@PositiveOrZero(message = "quantity must be positive or zero") Integer quantity,
			@PositiveOrZero(message = "variantId must be positive or zero") Long variantId) {
		this.quantity = quantity;
		this.variantId = variantId;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Long getVariantId() {
		return variantId;
	}

	public void setVariantId(Long variantId) {
		this.variantId = variantId;
	}

}
