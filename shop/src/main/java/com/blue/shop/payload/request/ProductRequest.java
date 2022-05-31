package com.blue.shop.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

public class ProductRequest {

	@NotBlank(message = "productName is required")
	private String productName;

	@NotBlank(message = "image01 is required")
	private String image01;

	@NotBlank(message = "image02 is required")
	private String image02;

	@PositiveOrZero(message = "categoryId must be positive or zero")
	private Long categoryId;

	private String description;

	public ProductRequest() {
	}

	public ProductRequest(@NotBlank(message = "productName is required") String productName,
			@NotBlank(message = "image01 is required") String image01,
			@NotBlank(message = "image02 is required") String image02,
			@NotBlank(message = "categoryId is required") @Positive(message = "categoryId must be positive or zero") Long categoryId,
			String description) {
		this.productName = productName;
		this.image01 = image01;
		this.image02 = image02;
		this.categoryId = categoryId;
		this.description = description;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
