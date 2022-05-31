package com.blue.shop.common;

public enum OrderStatus {

	CANCEL_ORDER((byte) 0, "Hủy đơn"),
	ACCEPTING((byte) 1, "Chờ xác nhận"),
	DELIVERING((byte) 2, "Chờ giao hàng"),
	DELIVERED((byte) 3, "Hoàn thành");

	private final byte status;
	private final String description;

	private OrderStatus(byte status, String description) {
		this.status = status;
		this.description = description;
	}

	public byte getStatus() {
		return status;
	}

	public String getDescription() {
		return description;
	}

}
