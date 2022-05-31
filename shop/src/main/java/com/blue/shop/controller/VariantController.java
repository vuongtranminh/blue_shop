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
import com.blue.shop.payload.request.VariantRequest;
import com.blue.shop.payload.response.ResponseObject;
import com.blue.shop.service.VariantService;

@RestController
@RequestMapping(path = "/api/v1/variants")
public class VariantController {

	@Autowired
	VariantService variantService;

	@GetMapping
	public ResponseEntity<?> getAll(
			@RequestParam(name = "page", required = false, defaultValue = DEFAULT_PAGE_NUMBER) int page,
			@RequestParam(name = "size", required = false, defaultValue = DEFAULT_PAGE_SIZE) int size,
			@RequestParam(name = "sort", required = false, defaultValue = DEFAULT_SORT) String sort,
			@RequestParam(name = "desc", required = false, defaultValue = DEFAULT_DESC) boolean desc) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", variantService.getAll(page, size, sort, desc)));
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PositiveOrZero @PathVariable(name = "id") Long id) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", variantService.getById(id)));
	}

	@PutMapping("/delete/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> softDeleteById(@PositiveOrZero @PathVariable(name = "id") Long id,
			@CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(variantService.softDeleteById(id, currentUser), "Success", null));
	}

	@PutMapping("/restore/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> restoreById(@PositiveOrZero @PathVariable(name = "id") Long id,
			@CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(variantService.restoreById(id, currentUser), "Success", null));
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateById(@Valid @RequestBody VariantRequest row,
			@PositiveOrZero @PathVariable(name = "id") Long id, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", variantService.updateById(row, id, currentUser)));
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> insert(@Valid @RequestBody VariantRequest row, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(variantService.insert(row, currentUser), "Success", null));
	}
	
	@GetMapping("/product")
	public ResponseEntity<?> getVariantsByProductId(@RequestParam(name = "productId", required = true) Long productId) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", variantService.getVariantsByProductId(productId)));
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteById (@PositiveOrZero @PathVariable(name = "id") Long id, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ResponseObject(variantService.deleteById(id, currentUser), "Success", null));
	}
}
