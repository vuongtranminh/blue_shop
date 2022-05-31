package com.blue.shop.common;

public enum Bin {

	DELETED((byte) 0, "DELETED"), ACTIVE((byte) 1, "ACTIVE");

	private final Byte bin;
	private final String description;

	private Bin(Byte bin, String description) {
		this.bin = bin;
		this.description = description;
	}

	public Byte getBin() {
		return bin;
	}

	public String getDescription() {
		return description;
	}

}
