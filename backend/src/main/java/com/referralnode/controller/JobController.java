package com.referralnode.controller;

import com.referralnode.dto.JobResponse;
import com.referralnode.dto.PageResponse;
import com.referralnode.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    /**
     * Get all jobs with pagination and optional filtering
     * 
     * @param page Page number (default: 0)
     * @param size Page size (default: 10)
     * @param sortBy Field to sort by (default: postedAt)
     * @param sortDir Sort direction (default: DESC)
     * @param company Filter by company name (optional)
     * @param location Filter by location (optional)
     * @param title Filter by job title (optional)
     * @param tags Filter by tags (optional, comma-separated)
     * @return Paginated list of jobs
     */
    @GetMapping
    public ResponseEntity<PageResponse<JobResponse>> getAllJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "postedAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String tags) {
        
        // Create pageable with sorting
        Sort sort = sortDir.equalsIgnoreCase("ASC") 
                ? Sort.by(sortBy).ascending() 
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        // Parse tags if provided
        List<String> tagList = null;
        if (tags != null && !tags.trim().isEmpty()) {
            tagList = List.of(tags.split(","));
        }
        
        PageResponse<JobResponse> response = jobService.getJobsWithFilters(
                pageable, company, location, title, tagList);
        
        return ResponseEntity.ok(response);
    }
}
