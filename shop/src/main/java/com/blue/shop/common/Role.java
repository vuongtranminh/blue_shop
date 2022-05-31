package com.blue.shop.common;

public enum Role {

	ROLE_ADMIN(1l, "ROLE_ADMIN"), 
	ROLE_MODERATOR(2l, "ROLE_MODERATOR"), 
	ROLE_USER(3l, "ROLE_USER");

	private final Long role;
	private final String description;

	private Role(Long role, String description) {
		this.role = role;
		this.description = description;
	}

	public Long getRole() {
		return role;
	}

	public String getDescription() {
		return description;
	}

}
