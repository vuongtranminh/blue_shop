package com.blue.shop.auth;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import com.blue.shop.mybatis.entity.RolePo;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.blue.shop.mybatis.entity.UserPo;

public class UserPrincipal implements UserDetails, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private UserPo userPo;

	private Collection<? extends GrantedAuthority> authorities;

	public UserPrincipal(UserPo userPo, Collection<? extends GrantedAuthority> authorities) {
		this.userPo = userPo;
		this.authorities = authorities;
	}

	public static UserPrincipal build(UserPo userPo, RolePo rolePo) {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority(rolePo.getName()));
		return new UserPrincipal(userPo, authorities);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return userPo.getPassword();
	}

	@Override
	public String getUsername() {
		return userPo.getEmail();
	}
	
	public Long getId() {
		return userPo.getId();
	}

	public String getDisplayName() {
		return userPo.getDisplayName();
	}

	public String getAvatar() {
		return userPo.getAvatar();
	}

	public String getPhone() {
		return userPo.getPhone();
	}

	public String getCover() {
		return userPo.getCover();
	}

	public Byte getGender() {
		return userPo.getGender();
	}

	public Date getBirth() {
		return userPo.getBirth();
	}

	public Long getRoleId() {
		return userPo.getRoleId();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public UserPo getUser() {
		return userPo;
	}

	public void setUser(UserPo userPo) {
		this.userPo = userPo;
	}

}
