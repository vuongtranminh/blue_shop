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
import com.blue.shop.payload.request.CategoryRequest;
import com.blue.shop.payload.response.ResponseObject;
import com.blue.shop.service.CategoryService;

@RestController
@RequestMapping(path = "/api/v1/categories")
public class CategoryController {
	
	@Autowired
	CategoryService categoryService;

	@GetMapping
	public ResponseEntity<?> getAll(
			@RequestParam(name = "page", required = false, defaultValue = DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = DEFAULT_PAGE_SIZE) Integer size,
            @RequestParam(name = "sort", required = false, defaultValue = DEFAULT_SORT) String sort,
            @RequestParam(name = "desc", required = false, defaultValue = DEFAULT_DESC) Boolean desc) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", categoryService.getAll(page, size, sort, desc)));
	} 
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getById (@PositiveOrZero @PathVariable(name = "id") Long id) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", categoryService.getById(id)));
	}
	
	@PutMapping("/delete/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> softDeleteById (@PositiveOrZero @PathVariable(name = "id") Long id, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ResponseObject(categoryService.softDeleteById(id, currentUser), "Success", null));
	}
	
	@PutMapping("/restore/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> restoreById (@PositiveOrZero @PathVariable(name = "id") Long id, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ResponseObject(categoryService.restoreById(id, currentUser), "Success", null));
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateById (@Valid @RequestBody CategoryRequest row, @PositiveOrZero @PathVariable(name = "id") Long id, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", categoryService.updateById(row, id, currentUser)));
	}
	
	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> insert (@Valid @RequestBody CategoryRequest row, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ResponseObject(categoryService.insert(row, currentUser), "Success", null));
	} 
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteById (@PositiveOrZero @PathVariable(name = "id") Long id, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ResponseObject(categoryService.deleteById(id, currentUser), "Success", null));
	}
}
