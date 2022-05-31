package com.blue.shop.auth;

import java.util.Date;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class TokenProvider {
	
	private static final Logger LOGGER = LogManager.getLogger(TokenProvider.class);

	@Value("${blue.app.jwtSecret}")
    private String jwtSecret;

    @Value("${blue.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    /**
     * Tạo ra jwt từ thông tin user
     * @param authentication
     * @return String
     */
    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);
        // Tạo chuỗi json web token từ tên của user.
        return Jwts.builder()
                .setSubject((userPrincipal.getUsername())) // thông tin người dùng được gửi vào
                .setIssuedAt(now) // thời gian hiện tại
                .setExpiration(expiryDate) // thời gian hết hạn
                .signWith(SignatureAlgorithm.HS512, jwtSecret) // thuật toán và mã bí mật
                .compact();
    }

    /**
     * Lấy thông tin user từ jwt
     * @param token
     * @return String
     */
    public String getUserNameFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
        	LOGGER.error("Invalid JWT signature: {}", ex.getMessage());
        }catch (MalformedJwtException ex) {
        	LOGGER.error("Invalid JWT token: {}", ex.getMessage());
        } catch (ExpiredJwtException ex) {
        	LOGGER.error("Expired JWT token: {}", ex.getMessage());
        } catch (UnsupportedJwtException ex) {
        	LOGGER.error("Unsupported JWT token: {}", ex.getMessage());
        } catch (IllegalArgumentException ex) {
        	LOGGER.error("JWT claims string is empty: {}", ex.getMessage());
        }
        return false;
    }
    
}
