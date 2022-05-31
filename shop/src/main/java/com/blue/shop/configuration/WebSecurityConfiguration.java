package com.blue.shop.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.BeanIds;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.blue.shop.auth.CustomUserDetailsService;
import com.blue.shop.auth.RestAuthenticationEntryPoint;
import com.blue.shop.auth.TokenAuthenticationFilter;

@Configuration
@EnableWebSecurity
/**
 * Hỗ trợ 3 kiểu phần quyền theo role.Cơ bản chức năng của 3 kiểu là như nhau
 * securedEnabled: Cho phép phân quyền sử dụng annotation @Secured
 * jsr250Enabled: Cho phép phân quyền sử dụng @RoleAllow
 * prePostEnabled: Cho phép phân quyền sử dụng annotation @PreAuthorize/@PostAuthorize
 */
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private RestAuthenticationEntryPoint unauthorizedHandler;

    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter();
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        // Get AuthenticationManager bean
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Password encoder, để Spring Security sử dụng mã hóa mật khẩu người dùng
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.userDetailsService(customUserDetailsService) // Cung cấp userService cho spring security
                .passwordEncoder(passwordEncoder()); // cung cấp password encoder
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors() // Ngăn chặn request từ một domain khác
                .and()
                .csrf().disable() // chống csrf attack
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // phiên
                .and()
                .authorizeRequests().antMatchers("/",
                        "/error",
                        "/favicon.ico",
                        "/**/*.png",
                        "/**/*.gif",
                        "/**/*.svg",
                        "/**/*.jpg",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js")
                .permitAll()
                .antMatchers(HttpMethod.POST, "/api/v1/auth/**").permitAll() // Cho phép tất cả mọi người truy cập vào địa chỉ này
                .antMatchers(HttpMethod.GET, "/api/v1/users/checkEmailAvailability").permitAll()
                .antMatchers("/api/v1/categories/**").permitAll()
                .antMatchers("/api/v1/products/**").permitAll()
                .antMatchers("/api/v1/variants/**").permitAll()
                .antMatchers(HttpMethod.GET, "/swagger-ui/**", "/api-docs/**").permitAll()
                .anyRequest().authenticated();


        // Thêm một lớp Filter kiểm tra jwt
        http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
    
}
