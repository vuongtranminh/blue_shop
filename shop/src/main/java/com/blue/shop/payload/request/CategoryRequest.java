package com.blue.shop.payload.request;

import javax.validation.constraints.NotBlank;

public class CategoryRequest {

	@NotBlank(message = "categoryName is required")
	private String categoryName;

	@NotBlank(message = "image is required")
	private String image;

	private String description;

	public CategoryRequest() {
	}

	public CategoryRequest(@NotBlank(message = "categoryName is required") String categoryName,
			@NotBlank(message = "image is required") String image, String description) {
		this.categoryName = categoryName;
		this.image = image;
		this.description = description;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
