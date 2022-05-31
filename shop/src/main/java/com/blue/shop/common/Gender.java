package com.blue.shop.common;

public enum Gender {
	MALE((byte) 0, "male"), 
	FEMALE((byte) 1, "female");

	private final Byte gender;
	private final String description;

	private Gender(Byte gender, String description) {
		this.gender = gender;
		this.description = description;
	}

	public Byte getGender() {
		return gender;
	}

	public String getDescription() {
		return description;
	}

}
