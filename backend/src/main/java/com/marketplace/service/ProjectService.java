package com.marketplace.service;

import com.marketplace.dto.Dtos.*;
import com.marketplace.entity.Project;
import com.marketplace.entity.User;
import com.marketplace.repository.ProjectRepository;
import com.marketplace.repository.PurchaseRepository;
import com.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired private ProjectRepository projectRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private PurchaseRepository purchaseRepository;

    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAllByOrderByCreatedAtDesc()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<ProjectResponse> getOrganizerProjects(String email) {
        User organizer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return projectRepository.findByOrganizerOrderByCreatedAtDesc(organizer)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public ProjectResponse createProject(ProjectRequest req, String email) {
        User organizer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Project project = new Project();
        project.setTitle(req.getTitle());
        project.setDescription(req.getDescription());
        project.setPrice(req.getPrice());
        project.setCategory(req.getCategory());
        project.setImageUrl(req.getImageUrl());
        project.setOrganizer(organizer);
        return toResponse(projectRepository.save(project));
    }

    public ProjectResponse updateProject(Long id, ProjectRequest req, String email) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        if (!project.getOrganizer().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }
        project.setTitle(req.getTitle());
        project.setDescription(req.getDescription());
        project.setPrice(req.getPrice());
        project.setCategory(req.getCategory());
        project.setImageUrl(req.getImageUrl());
        return toResponse(projectRepository.save(project));
    }

    public void deleteProject(Long id, String email) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        if (!project.getOrganizer().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }
        projectRepository.delete(project);
    }

    public DashboardStats getDashboardStats(String email) {
        User organizer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Long total = projectRepository.countByOrganizer(organizer);
        Integer sold = projectRepository.sumSoldCountByOrganizer(organizer);
        if (sold == null) sold = 0;

        List<ProjectResponse> projects = getOrganizerProjects(email);
        BigDecimal revenue = projects.stream()
                .map(p -> p.getPrice().multiply(BigDecimal.valueOf(p.getSoldCount())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long pending = purchaseRepository.countPendingByOrganizer(organizer);

        List<Object[]> catStats = projectRepository.countByOrganizerGroupByCategory(organizer);
        List<CategoryStat> categoryStats = catStats.stream()
                .map(row -> new CategoryStat((String) row[0], (Long) row[1]))
                .collect(Collectors.toList());

        return new DashboardStats(total, sold, revenue, pending, categoryStats);
    }

    private ProjectResponse toResponse(Project p) {
        return new ProjectResponse(
                p.getId(), p.getTitle(), p.getDescription(), p.getPrice(),
                p.getCategory(), p.getImageUrl(), p.getStatus().name(),
                p.getSoldCount(), p.getOrganizer().getId(), p.getOrganizer().getName(),
                p.getOrganizer().getAvatar(), p.getCreatedAt());
    }
}
