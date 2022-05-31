package com.blue.shop.util;

import static com.blue.shop.util.AppConstants.MAX_PAGE_SIZE;

import org.springframework.http.HttpStatus;

import com.blue.shop.payload.response.ApiException;

public class Utils {

	public static void validatePageNumberAndSize(int page, int size) {
        if (page < 0) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Page number cannot be less than zero.");
        }

        if (size < 0) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Size number cannot be less than zero.");
        }

        if (size > MAX_PAGE_SIZE) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Page size must not be greater than " + MAX_PAGE_SIZE);
        }
    }
	
}
