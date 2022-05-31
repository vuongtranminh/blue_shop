package com.blue.shop.payload.request;

import java.util.Date;

import com.blue.shop.validator.Phone;

public class UserRequest {

	private String displayName;

	@Phone
	private String phone;

	private Byte gender;

	private Date birth;

	private String avatar;

	private String cover;

	public UserRequest() {
	}

	public UserRequest(String displayName, String phone, Byte gender, Date birth, String avatar, String cover) {
		this.displayName = displayName;
		this.phone = phone;
		this.gender = gender;
		this.birth = birth;
		this.avatar = avatar;
		this.cover = cover;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Byte getGender() {
		return gender;
	}

	public void setGender(Byte gender) {
		this.gender = gender;
	}

	public Date getBirth() {
		return birth;
	}

	public void setBirth(Date birth) {
		this.birth = birth;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getCover() {
		return cover;
	}

	public void setCover(String cover) {
		this.cover = cover;
	}

}
