package com.blue.shop.payload.response;

import com.blue.shop.auth.UserPrincipal;

public class UserSummary {

	private Long id;
	private String displayName;
	private String avatar;
	private Long roleId;

	public UserSummary() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public static UserSummary valueOf(UserPrincipal currentUser) {
		UserSummary userSummary = new UserSummary();

		userSummary.setId(currentUser.getId());
		userSummary.setDisplayName(currentUser.getDisplayName());
		userSummary.setAvatar(currentUser.getAvatar());
		userSummary.setRoleId(currentUser.getRoleId());

		return userSummary;
	}

}
