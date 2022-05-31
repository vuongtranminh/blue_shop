package com.blue.shop.validator;

import com.blue.shop.payload.request.OrderItemRequest;

import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class NotBlankArrayValidator implements ConstraintValidator<NotBlankArray, List<OrderItemRequest>> {

	@Override
	public boolean isValid(List<OrderItemRequest> value, ConstraintValidatorContext context) {
		if (value == null || value.size() < 1) return false;
		return true;
	}

}
