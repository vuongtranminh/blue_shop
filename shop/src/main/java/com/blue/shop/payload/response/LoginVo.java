package com.blue.shop.payload.response;

public class LoginVo {

	private String accessToken;
	private String tokenType = "Bearer";

	public LoginVo() {
	}

	public LoginVo(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getTokenType() {
		return tokenType;
	}

}
