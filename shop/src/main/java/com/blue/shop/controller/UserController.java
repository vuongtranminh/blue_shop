package com.blue.shop.controller;

import static com.blue.shop.util.AppConstants.DEFAULT_DESC;
import static com.blue.shop.util.AppConstants.DEFAULT_PAGE_NUMBER;
import static com.blue.shop.util.AppConstants.DEFAULT_PAGE_SIZE;
import static com.blue.shop.util.AppConstants.DEFAULT_SORT;

import javax.validation.Valid;
import javax.validation.constraints.PositiveOrZero;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.blue.shop.auth.CurrentUser;
import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.payload.request.UserRequest;
import com.blue.shop.payload.response.ResponseObject;
import com.blue.shop.service.UserService;

@RestController
@RequestMapping(path = "/api/v1/users")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        return ResponseEntity
        		.status(HttpStatus.OK)
        		.body(new ResponseObject(Boolean.TRUE, "Success", userService.getCurrentUser(currentUser)));
    }
	
	@GetMapping("/profile/{id}")
	public ResponseEntity<?> getUserProfile(@PositiveOrZero @PathVariable(name = "id") Long id, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", userService.getUserProfile(id, currentUser)));
	}
	
	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getAll(
			@RequestParam(name = "page", required = false, defaultValue = DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = DEFAULT_PAGE_SIZE) Integer size,
            @RequestParam(name = "sort", required = false, defaultValue = DEFAULT_SORT) String sort,
            @RequestParam(name = "desc", required = false, defaultValue = DEFAULT_DESC) Boolean desc) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", userService.getAll(page, size, sort, desc)));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody UserRequest newUser, @PositiveOrZero @PathVariable(name = "id") Long id, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", userService.update(newUser, id, currentUser)));
		
	}
	
	@GetMapping("/checkEmailAvailability")
	public ResponseEntity<?> checkEmailAvailability(@RequestParam(name = "email") String email) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "success", userService.checkEmailAvailability(email)));
	}

}
