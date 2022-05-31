package com.blue.shop.mybatis.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import com.blue.shop.common.Bin;
import com.blue.shop.common.OrderStatus;

public class OrderPo implements Serializable {
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

    private Byte status;

    private Byte isDeleted;

    private Date createdAt;

    private Date updatedAt;

    private Date paymentedAt;

    private Date deliveredAt;

    private static final long serialVersionUID = 1L;
    
    public OrderPo() {
		Date now = new Date();
		this.status = OrderStatus.ACCEPTING.getStatus();
		this.isDeleted = Bin.ACTIVE.getBin();
		this.createdAt = now;
		this.updatedAt = now;
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
        this.buyerName = buyerName == null ? null : buyerName.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city == null ? null : city.trim();
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district == null ? null : district.trim();
    }

    public String getCommune() {
        return commune;
    }

    public void setCommune(String commune) {
        this.commune = commune == null ? null : commune.trim();
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note == null ? null : note.trim();
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

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", buyerId=").append(buyerId);
        sb.append(", totalPrice=").append(totalPrice);
        sb.append(", buyerName=").append(buyerName);
        sb.append(", address=").append(address);
        sb.append(", phone=").append(phone);
        sb.append(", city=").append(city);
        sb.append(", district=").append(district);
        sb.append(", commune=").append(commune);
        sb.append(", note=").append(note);
        sb.append(", status=").append(status);
        sb.append(", isDeleted=").append(isDeleted);
        sb.append(", createdAt=").append(createdAt);
        sb.append(", updatedAt=").append(updatedAt);
        sb.append(", paymentedAt=").append(paymentedAt);
        sb.append(", deliveredAt=").append(deliveredAt);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}