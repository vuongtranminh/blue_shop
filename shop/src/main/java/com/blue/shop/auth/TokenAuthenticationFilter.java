package com.blue.shop.auth;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Kiểm tra request của người dùng trước khi nó tới đích.
 * Nó sẽ lấy Header Authorization ra và kiểm tra xem chuỗi JWT người dùng gửi lên có hợp lệ không.
 */
public class TokenAuthenticationFilter extends OncePerRequestFilter {
	
	private static final Logger LOGGER = LogManager.getLogger(TokenAuthenticationFilter.class);

	@Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    /**
     * Kiểm tra token có hợp lệ không
     * @param request
     * @param response
     * @param filterChain
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            // Lấy jwt từ request
            String jwt = getJwtFromRequest(request);

            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                // Lấy username từ chuỗi jwt
                String username = tokenProvider.getUserNameFromToken(jwt);
                // Lấy thông tin người dùng từ id
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                if(userDetails != null) {
                    // Nếu người dùng hợp lệ, set thông tin cho Seturity Context
                    UsernamePasswordAuthenticationToken
                            authentication = new UsernamePasswordAuthenticationToken(userDetails,
                            null,
                            userDetails.getAuthorities());

                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (Exception ex) {
        	LOGGER.error("failed on set user authentication", ex);
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Lấy JWT từ request
     * @param request
     * @return String
     */
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("token");
        // Kiểm tra xem header Authorization có chứa thông tin jwt không
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
    
}
