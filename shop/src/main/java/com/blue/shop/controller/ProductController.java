package com.blue.shop.controller;

import com.blue.shop.auth.CurrentUser;
import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.mybatis.entity.ProductPo;
import com.blue.shop.payload.request.ProductRequest;
import com.blue.shop.payload.response.ResponseObject;
import com.blue.shop.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.PositiveOrZero;

import static com.blue.shop.util.AppConstants.*;

@RestController
@RequestMapping(path = "/api/v1/products")
@Tag(name = "products")
public class ProductController {

	@Autowired
	ProductService productService;

	@Operation(description = "Xem danh sách Sản phẩm", responses = {
            @ApiResponse(content = @Content(array = @ArraySchema(schema = @Schema(implementation = ProductPo.class))), responseCode = "200") })
	@GetMapping
	public ResponseEntity<?> getAll(
			@RequestParam(name = "page", required = false, defaultValue = DEFAULT_PAGE_NUMBER) int page,
			@RequestParam(name = "size", required = false, defaultValue = DEFAULT_PAGE_SIZE) int size,
			@RequestParam(name = "sort", required = false, defaultValue = DEFAULT_SORT) String sort,
			@RequestParam(name = "desc", required = false, defaultValue = DEFAULT_DESC) boolean desc) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", productService.getAll(page, size, sort, desc)));
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PositiveOrZero @PathVariable(name = "id") Long id) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", productService.getById(id)));
	}

	@PutMapping("/delete/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> softDeleteById(@PositiveOrZero @PathVariable(name = "id") Long id,
			@CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(productService.softDeleteById(id, currentUser), "Success", null));
	}

	@PutMapping("/restore/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> restoreById(@PositiveOrZero @PathVariable(name = "id") Long id,
			@CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(productService.restoreById(id, currentUser), "Success", null));
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateById(@Valid @RequestBody ProductRequest row,
			@PositiveOrZero @PathVariable(name = "id") Long id, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", productService.updateById(row, id, currentUser)));
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> insert(@Valid @RequestBody ProductRequest row, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(productService.insert(row, currentUser), "Success", null));
	}
	
	@GetMapping("/category")
	public ResponseEntity<?> getProductsByCategoryId(
			@RequestParam(name = "categoryId", required = true) Long categoryId,
			@RequestParam(name = "page", required = false, defaultValue = DEFAULT_PAGE_NUMBER) int page,
			@RequestParam(name = "size", required = false, defaultValue = DEFAULT_PAGE_SIZE) int size,
			@RequestParam(name = "sort", required = false, defaultValue = DEFAULT_SORT) String sort,
			@RequestParam(name = "desc", required = false, defaultValue = DEFAULT_DESC) boolean desc) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", productService.getProductsByCategoryId(categoryId, page, size, sort, desc)));
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteById (@PositiveOrZero @PathVariable(name = "id") Long id, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ResponseObject(productService.deleteById(id, currentUser), "Success", null));
	}

}
