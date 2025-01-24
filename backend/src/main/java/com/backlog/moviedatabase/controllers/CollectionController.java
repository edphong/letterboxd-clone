package com.backlog.moviedatabase.controllers;

import com.backlog.moviedatabase.models.Collection;
import com.backlog.moviedatabase.services.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/collections") // The base path for collection APIs
public class CollectionController {

    private final CollectionService collectionService;

    @Autowired
    public CollectionController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping("/{collectionId}") // Handle GET requests for a specific collection
    public ResponseEntity<Collection> getCollectionById(@PathVariable int collectionId) {
        Collection collection = collectionService.getCollectionById(collectionId);
        if (collection == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(collection);
    }
}
