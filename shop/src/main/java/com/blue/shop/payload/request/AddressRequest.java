package com.blue.shop.payload.request;

import com.blue.shop.validator.Phone;

import javax.validation.constraints.NotBlank;

public class AddressRequest {

	@NotBlank(message = "address is required")
	private String address;

	@NotBlank(message = "commune is required")
	private String commune;

	@NotBlank(message = "district is required")
	private String district;

	@NotBlank(message = "city is required")
	private String city;

	private Byte type;

	@NotBlank(message = "name is required")
	private String name;

	@Phone
	private String phone;

	public AddressRequest() {
	}

	public AddressRequest(@NotBlank(message = "address is required") String address,
			@NotBlank(message = "commune is required") String commune,
			@NotBlank(message = "district is required") String district,
			@NotBlank(message = "city is required") String city, Byte type) {
		this.address = address;
		this.commune = commune;
		this.district = district;
		this.city = city;
		this.type = type;
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
}
