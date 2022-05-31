package com.blue.shop.payload.response;

import com.blue.shop.mybatis.entity.UserPo;

import java.util.Date;

public class UserVo {

	private Long id;
	private String displayName;
	private String email;
	private String phone;
	private Byte gender;
	private Date birth;
	private String avatar;
	private String cover;
	private Byte isDeleted;
	private Date createdAt;
	private Date updatedAt;
	private Long roleId;

	public UserVo() {
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public static UserVo valueOf(UserPo po) {

		UserVo vo = new UserVo();

		vo.setId(po.getId());
		vo.setAvatar(po.getAvatar());
		vo.setBirth(po.getBirth());
		vo.setCover(po.getCover());
		vo.setDisplayName(po.getDisplayName());
		vo.setEmail(po.getEmail());
		vo.setGender(po.getGender());
		vo.setPhone(po.getPhone());
		vo.setCreatedAt(po.getCreatedAt());
		vo.setUpdatedAt(po.getUpdatedAt());
		vo.setIsDeleted(po.getIsDeleted());
		vo.setRoleId(po.getRoleId());

		return vo;
	}

}
