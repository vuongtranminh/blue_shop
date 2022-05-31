package com.blue.shop.validator;

import java.util.regex.Pattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PhoneValidator implements ConstraintValidator<Phone, String>{

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		String regex = "(84|0[3|5|7|8|9])+([0-9]{8})\\b";
		if (value == null || value.isEmpty()) return false;
		return Pattern.matches(regex, value);
	}

}
