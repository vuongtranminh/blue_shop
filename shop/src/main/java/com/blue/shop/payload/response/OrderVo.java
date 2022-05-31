package com.blue.shop.payload.response;

import com.blue.shop.mybatis.entity.OrderPo;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class OrderVo {

	private Long id;

	private Long buyerId;

	private BigDecimal totalPrice;

	private String buyerName;

	private String address;

	private String phone;

	private String city;

	private String district;

	private String commune;

	private String note;

	private List<OrderItemVo> items;

	private Byte status;

	private Byte isDeleted;

	private Date createdAt;

	private Date updatedAt;

	private Date paymentedAt;

	private Date deliveredAt;

	public OrderVo() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getBuyerId() {
		return buyerId;
	}

	public void setBuyerId(Long buyerId) {
		this.buyerId = buyerId;
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

	public List<OrderItemVo> getItems() {
		return items;
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

	public void setItems(List<OrderItemVo> items) {
		this.items = items;
	}

	public Byte getStatus() {
		return status;
	}

	public void setStatus(Byte status) {
		this.status = status;
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

	public Date getPaymentedAt() {
		return paymentedAt;
	}

	public void setPaymentedAt(Date paymentedAt) {
		this.paymentedAt = paymentedAt;
	}

	public Date getDeliveredAt() {
		return deliveredAt;
	}

	public void setDeliveredAt(Date deliveredAt) {
		this.deliveredAt = deliveredAt;
	}

	public static OrderVo valueOf(OrderPo po, List<OrderItemVo> items) {
		OrderVo vo = new OrderVo();
		vo.setAddress(po.getAddress());
		vo.setBuyerId(po.getId());
		vo.setBuyerName(po.getBuyerName());
		vo.setCreatedAt(po.getCreatedAt());
		vo.setDeliveredAt(po.getDeliveredAt());
		vo.setId(po.getId());
		vo.setIsDeleted(po.getIsDeleted());
		vo.setItems(items);
		vo.setPaymentedAt(po.getPaymentedAt());
		vo.setPhone(po.getPhone());
		vo.setStatus(po.getStatus());
		vo.setTotalPrice(po.getTotalPrice());
		vo.setUpdatedAt(po.getUpdatedAt());
		vo.setCity(po.getCity());
		vo.setDistrict(po.getDistrict());
		vo.setCommune(po.getCommune());
		vo.setNote(po.getNote());

		return vo;
	}

}
