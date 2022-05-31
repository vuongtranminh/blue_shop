package com.blue.shop.service;

import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.web.multipart.MultipartFile;

public interface DBFileStorageService {
	
	 String storeFile(MultipartFile file);
	 
	 List<String> storeMultipleFiles(MultipartFile[] files);
	 
	 Stream<Path> loadAll(); //load all file inside a folder
	 
	 byte[] readFileContent(String fileName);
	 
}
