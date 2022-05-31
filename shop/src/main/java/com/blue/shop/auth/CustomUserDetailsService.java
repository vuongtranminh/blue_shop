package com.blue.shop.auth;

import com.blue.shop.mybatis.entity.UserPo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blue.shop.mybatis.dao.RoleMapper;
import com.blue.shop.mybatis.dao.UserMapper;
import com.blue.shop.mybatis.entity.RolePo;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	UserMapper userMapper;
	
	@Autowired
	RoleMapper roleMapper;

	@Override
	@Transactional(rollbackFor = { Exception.class, Throwable.class }) // nếu xảy ra lỗi sẽ rollback lại các thao tác																// trước đó
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserPo userPo = userMapper.selectByEmail(username);
		return UserPrincipal.build(userPo, loadRoleById(userPo.getRoleId()));
	}
	
	public RolePo loadRoleById (Long id) {
		return roleMapper.selectById(id);
	}

}
