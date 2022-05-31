package com.blue.shop.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.blue.shop.payload.response.ResponseObject;
import com.blue.shop.service.DBFileStorageService;

@RestController
@RequestMapping(path = "/api/v1/files")
public class FileController {

	// Inject DBFileStorageService here
	@Autowired
	private DBFileStorageService dbFileStorageService;

	@PostMapping("")
	public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
		// save files to a folder => use a service
		String generatedFileName = dbFileStorageService.storeFile(file);
		String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/files/").path(generatedFileName)
				.toUriString();
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", fileUri));
	}
	
	@PostMapping("/uploadMultipleFiles")
    public ResponseEntity<?> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
		List<String> filesUri = dbFileStorageService.storeMultipleFiles(files).stream()
									.map((fileUri) -> 
										ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/files/")
											.path(fileUri)
											.toUriString()
									).collect(Collectors.toList()) ;
		
        return ResponseEntity
        		.status(HttpStatus.OK)
        		.body(new ResponseObject(Boolean.TRUE, "Success", filesUri));
    }

	// get image's url
	@GetMapping("/{fileName:.+}")
	// /files/06a290064eb94a02a58bfeef36002483.png
	public ResponseEntity<?> readDetailFile(@PathVariable String fileName) {
		try {
			byte[] bytes = dbFileStorageService.readFileContent(fileName);
			return ResponseEntity
					.status(HttpStatus.OK)
					.contentType(MediaType.IMAGE_JPEG)
					.body(bytes);
		} catch (Exception exception) {
			return ResponseEntity.noContent().build();
		}
	}

	// How to load all uploaded files ?
	@GetMapping("")
	public ResponseEntity<?> getUploadedFiles() {
		List<String> urls = dbFileStorageService.loadAll().map(path -> {
			// convert fileName to url(send request "readDetailFile")
			String urlPath = MvcUriComponentsBuilder
					.fromMethodName(FileController.class, "readDetailFile", path.getFileName().toString()).build()
					.toUri().toString();
			return urlPath;
		}).collect(Collectors.toList());
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ResponseObject(Boolean.TRUE, "Success", urls));
	}

}
