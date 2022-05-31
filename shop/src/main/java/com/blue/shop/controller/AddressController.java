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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blue.shop.auth.CurrentUser;
import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.payload.request.AddressRequest;
import com.blue.shop.payload.response.ResponseObject;
import com.blue.shop.service.AddressService;

@RestController
@RequestMapping(path = "api/v1/addresses")
public class AddressController {

	@Autowired
	AddressService addressService;

	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getAll(
			@RequestParam(name = "page", required = false, defaultValue = DEFAULT_PAGE_NUMBER) int page,
			@RequestParam(name = "size", required = false, defaultValue = DEFAULT_PAGE_SIZE) int size,
			@RequestParam(name = "sort", required = false, defaultValue = DEFAULT_SORT) String sort,
			@RequestParam(name = "desc", required = false, defaultValue = DEFAULT_DESC) boolean desc) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", addressService.getAll(page, size, sort, desc)));
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PositiveOrZero @PathVariable(name = "id") Long id, @PositiveOrZero @RequestParam(name= "userId") Long userId, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", addressService.getById(id, userId, currentUser)));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteById(@PositiveOrZero @PathVariable(name = "id") Long id, 
			@PositiveOrZero @RequestParam(name= "userId") Long userId, 
			@CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(addressService.deleteById(id, userId, currentUser), "Success", null));
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateById(@Valid @RequestBody AddressRequest row,
			@PositiveOrZero @PathVariable(name = "id") Long id, 
			@PositiveOrZero @RequestParam(name= "userId") Long userId, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", addressService.updateById(row, id, userId, currentUser)));
	}

	@PostMapping
	public ResponseEntity<?> insert(@Valid @RequestBody AddressRequest row, @PositiveOrZero @RequestParam(name= "userId") Long userId, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(addressService.insert(row, userId, currentUser), "Success", null));
	}
	
	@GetMapping("/user")
	public ResponseEntity<?> getAddressesByUserId(
			@RequestParam(name = "userId", required = true) Long userId, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", addressService.getAddressesByUserId(userId, currentUser)));
	}
	
}
