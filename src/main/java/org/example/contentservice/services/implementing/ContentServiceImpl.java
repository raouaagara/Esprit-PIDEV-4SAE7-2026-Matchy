package org.example.contentservice.services.implementing;

import org.example.contentservice.entities.Content;
import org.example.contentservice.repositories.ContentRepository;
import org.example.contentservice.services.interfaces.IContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ContentServiceImpl implements IContentService {

    @Autowired
    private ContentRepository contentRepository;

    @Override
    public List<Content> retrieveAllContents() {
        return contentRepository.findAll();
    }

    @Override
    public Content addContent(Content content) {
        content.setCreatedAt(LocalDateTime.now());
        content.setUpdatedAt(LocalDateTime.now());
        return contentRepository.save(content);
    }

    @Override
    public Content updateContent(Content content) {
        content.setUpdatedAt(LocalDateTime.now());
        return contentRepository.save(content);
    }

    @Override
    public Content retrieveContent(Integer contentId) {
        return contentRepository.findById(contentId).orElse(null);
    }

    @Override
    public void deleteContent(Integer contentId) {
        contentRepository.deleteById(contentId);
    }
}