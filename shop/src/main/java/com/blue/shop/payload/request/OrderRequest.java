package com.blue.shop.payload.request;

import java.math.BigDecimal;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;

import com.blue.shop.validator.NotBlankArray;
import com.blue.shop.validator.Phone;

public class OrderRequest {

	@PositiveOrZero(message = "totalPrice must be positive or zero")
	private BigDecimal totalPrice;

	@NotBlank(message = "buyerName is required")
	private String buyerName;

	@NotBlank(message = "address is required")
	private String address;

	@Phone
	private String phone;

	@NotBlank(message = "city is required")
	private String city;

	@NotBlank(message = "district is required")
	private String district;

	@NotBlank(message = "commune is required")
	private String commune;

	private String note;

	@NotBlankArray
	private List<OrderItemRequest> items;

	private Byte status;

	public OrderRequest() {
	}

	public OrderRequest(
			@NotBlank(message = "totalPrice is required") @PositiveOrZero(message = "totalPrice must be positive or zero") BigDecimal totalPrice,
			@NotBlank(message = "buyerName is required") String buyerName,
			@NotBlank(message = "address is required") String address,
			@NotBlank(message = "city is required") String city,
			@NotBlank(message = "district is required") String district,
			@NotBlank(message = "commune is required") String commune,
			String note, String phone, List<OrderItemRequest> items,
			Byte status) {
		this.totalPrice = totalPrice;
		this.buyerName = buyerName;
		this.address = address;
		this.phone = phone;
		this.city = city;
		this.district = district;
		this.commune = commune;
		this.note = note;
		this.items = items;
		this.status = status;
	}

	public BigDecimal getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getBuyerName() {
		return buyerName;
	}

	public void setBuyerName(String buyerName) {
		this.buyerName = buyerName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getCommune() {
		return commune;
	}

	public void setCommune(String commune) {
		this.commune = commune;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public List<OrderItemRequest> getItems() {
		return items;
	}

	public void setItems(List<OrderItemRequest> items) {
		this.items = items;
	}

	public Byte getStatus() {
		return status;
	}

	public void setStatus(Byte status) {
		this.status = status;
	}

}
