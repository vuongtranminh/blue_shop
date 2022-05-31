package com.blue.shop.payload.response;

import com.blue.shop.mybatis.entity.AddressPo;

import java.util.Date;

public class AddressVo {

	private Long id;

	private Long userId;

	private String address;

	private String commune;

	private String district;

	private String city;

	private Byte type;

	private Date createdAt;

	private Date updatedAt;

	private String name;

	private String phone;

	public AddressVo() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCommune() {
		return commune;
	}

	public void setCommune(String commune) {
		this.commune = commune;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Byte getType() {
		return type;
	}

	public void setType(Byte type) {
		this.type = type;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public static AddressVo valueOf(AddressPo po) {
		AddressVo vo = new AddressVo();

		vo.setId(po.getId());
		vo.setAddress(po.getAddress());
		vo.setCity(po.getCity());
		vo.setCommune(po.getCommune());
		vo.setDistrict(po.getDistrict());
		vo.setType(po.getType());
		vo.setUserId(po.getUserId());
		vo.setName(po.getName());
		vo.setPhone(po.getPhone());
		vo.setCreatedAt(po.getCreatedAt());
		vo.setUpdatedAt(po.getUpdatedAt());

		return vo;
	}

}
