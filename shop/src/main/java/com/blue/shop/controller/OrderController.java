package com.blue.shop.controller;

import com.blue.shop.auth.CurrentUser;
import com.blue.shop.auth.UserPrincipal;
import com.blue.shop.common.OrderStatus;
import com.blue.shop.payload.request.OrderRequest;
import com.blue.shop.payload.response.ResponseObject;
import com.blue.shop.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.PositiveOrZero;

import static com.blue.shop.util.AppConstants.*;

@RestController
@RequestMapping(path = "/api/v1/orders")
public class OrderController {

	@Autowired
	OrderService orderService;

	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getAll(
			@RequestParam(name = "page", required = false, defaultValue = DEFAULT_PAGE_NUMBER) int page,
			@RequestParam(name = "size", required = false, defaultValue = DEFAULT_PAGE_SIZE) int size,
			@RequestParam(name = "sort", required = false, defaultValue = DEFAULT_SORT) String sort,
			@RequestParam(name = "desc", required = false, defaultValue = DEFAULT_DESC) boolean desc) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", orderService.getAll(page, size, sort, desc)));
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PositiveOrZero @PathVariable(name = "id") Long id, @PositiveOrZero @RequestParam(name= "userId") Long userId, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", orderService.getById(id, userId, currentUser)));
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteById(@PositiveOrZero @PathVariable(name = "id") Long id, 
			@PositiveOrZero @RequestParam(name= "userId") Long userId, 
			@CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(orderService.deleteById(id, userId, currentUser), "Success", null));
	}

	@PostMapping
	public ResponseEntity<?> insert(@Valid @RequestBody OrderRequest row, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(orderService.insert(row, currentUser), "Success", null));
	}
	
	@GetMapping("/user")
	public ResponseEntity<?> getOrdersByUserId(
			@RequestParam(name = "userId", required = true) Long userId, @CurrentUser UserPrincipal currentUser,
			@RequestParam(name = "page", required = false, defaultValue = DEFAULT_PAGE_NUMBER) int page,
			@RequestParam(name = "size", required = false, defaultValue = DEFAULT_PAGE_SIZE) int size,
			@RequestParam(name = "sort", required = false, defaultValue = DEFAULT_SORT) String sort,
			@RequestParam(name = "desc", required = false, defaultValue = DEFAULT_DESC) boolean desc) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", orderService.getOrdersByUserId(userId, currentUser, page, size, sort, desc)));
	}
	
	@PutMapping("/paymented/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updatePaymentedById(@PositiveOrZero @PathVariable(name= "id") Long id, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(orderService.updatePaymentedById(id, currentUser), "Success", null));
	}
	
	@PutMapping("/accepted/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> accepted(@PositiveOrZero @PathVariable(name= "id") Long id, @RequestParam(name = "userId", required = true) Long userId, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(orderService.updateStatusOrder(id, userId, currentUser, OrderStatus.DELIVERING.getStatus()), "Success", null));
	}
	
	@PutMapping("/delivered/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> delivered(@PositiveOrZero @PathVariable(name= "id") Long id, @RequestParam(name = "userId", required = true) Long userId, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(orderService.updateStatusOrder(id, userId, currentUser, OrderStatus.DELIVERED.getStatus()), "Success", null));
	}
	
	@PutMapping("/cancelOrder/{id}")
	public ResponseEntity<?> cancelOrder(@PositiveOrZero @PathVariable(name= "id") Long id, @RequestParam(name = "userId", required = true) Long userId, @CurrentUser UserPrincipal currentUser) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject(orderService.updateStatusOrder(id, userId, currentUser, OrderStatus.CANCEL_ORDER.getStatus()), "Success", null));
	}
}
