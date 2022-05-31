package com.blue.shop.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import com.blue.shop.exception.BadRequestException;
import com.blue.shop.exception.FileNotFoundException;
import com.blue.shop.exception.FileStorageException;
import com.blue.shop.service.DBFileStorageService;

@Service
public class DBFileStorageServiceImpl implements DBFileStorageService {
	
	private final Path storageFolder = Paths.get("uploads");
	
	//constructor
    public DBFileStorageServiceImpl() {
        try {
            Files.createDirectories(storageFolder); // create folder in first inject when application start
        }catch (IOException e) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", e);
        }
    }
    
    private boolean isImageFile(String fileExtension) {
        return Arrays.asList(new String[] {"png","jpg","jpeg", "bmp"})
                .contains(fileExtension.trim().toLowerCase());
    }

	@Override
	public String storeFile(MultipartFile file) {
		try {
			// Normalize file name
	        //Let install FileNameUtils
	        
	        if (file.isEmpty()) {
                throw new BadRequestException("Failed to store empty file");
            }
	        
            //check file is image ?
	        
	        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
	        
            if(!isImageFile(fileExtension)) {
                throw new BadRequestException("You can only upload image file");
            }
            
          //file must be <= 5Mb
            float fileSizeInMegabytes = file.getSize() / 1_000_000.0f;
            if(fileSizeInMegabytes > 5.0f) {
                throw new BadRequestException("File must be <= 5Mb");
            }
            //File must be rename, why ?
            String generatedFileName = UUID.randomUUID().toString().replaceAll("[.|_|-]", "");
            generatedFileName = generatedFileName + "." + fileExtension;
            Path destinationFilePath = storageFolder.resolve(Paths.get(generatedFileName)).normalize().toAbsolutePath();
            if (!destinationFilePath.getParent().equals(storageFolder.toAbsolutePath())) {
                throw new FileStorageException("Cannot store file outside current directory.");
            }
            // Copy file to the target location (Replacing existing file with the same name)
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFilePath, StandardCopyOption.REPLACE_EXISTING);
            }
            return generatedFileName;
            
		} catch (IOException e) {
			throw new FileStorageException("Could not store file. Please try again!", e);
		}
	}

	@Override
	public Stream<Path> loadAll() {
		try {
            //list all files in storageFolder
            return Files.walk(storageFolder, 1)
                    .filter(path -> !path.equals(storageFolder))
                    .map(storageFolder::relativize);
        }
        catch (IOException e) {
            throw new FileStorageException("Failed to load stored files", e);
        }	
	}

	@Override
	public byte[] readFileContent(String fileName) {
		
		//	read file return byte. download file return Resource	
		try {
            Path file = storageFolder.resolve(fileName);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                byte[] bytes = StreamUtils.copyToByteArray(resource.getInputStream());
                return bytes;
            }
            else {
                throw new FileNotFoundException("Could not read file: " + fileName);
            }
        }
        catch (IOException e) {
            throw new FileNotFoundException("Could not read file: " + fileName, e);
        }
	}

	@Override
	public List<String> storeMultipleFiles(MultipartFile[] files) {
		try {
			return Arrays.asList(files)
					.stream()
					.map((file) -> storeFile(file))
					.collect(Collectors.toList());
		} catch (Exception e) {
			throw new FileStorageException("Could not store file. Please try again!", e);
		}
		
	}

}
