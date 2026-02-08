package com.referralnode.service;

import com.referralnode.dto.JobRequest;
import com.referralnode.dto.JobResponse;
import com.referralnode.dto.PageResponse;
import com.referralnode.entity.Job;
import com.referralnode.exception.ResourceNotFoundException;
import com.referralnode.mapper.JobMapper;
import com.referralnode.repository.JobRepository;
import com.referralnode.specification.JobSpecification;
import com.referralnode.util.RichTextUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobService {

    private final JobRepository jobRepository;
    private final JobMapper jobMapper;
    private final RichTextUtil richTextUtil;

    /**
     * Get all jobs with filters and pagination
     */
    public PageResponse<JobResponse> getJobsWithFilters(
            Pageable pageable,
            String company,
            String location,
            String title,
            List<String> tags) {
        
        Specification<Job> spec = JobSpecification.filterJobs(company, location, title, tags);
        Page<Job> jobPage = jobRepository.findAll(spec, pageable);
        
        List<JobResponse> jobResponses = jobPage.getContent().stream()
                .map(jobMapper::toResponse)
                .collect(Collectors.toList());
        
        return PageResponse.<JobResponse>builder()
                .content(jobResponses)
                .pageNumber(jobPage.getNumber())
                .pageSize(jobPage.getSize())
                .totalElements(jobPage.getTotalElements())
                .totalPages(jobPage.getTotalPages())
                .first(jobPage.isFirst())
                .last(jobPage.isLast())
                .build();
    }

    /**
     * Get a single job by ID
     */
    public JobResponse getJobById(UUID id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        return jobMapper.toResponse(job);
    }

    /**
     * Create a new job (Admin)
     */
    @Transactional
    public JobResponse createJob(JobRequest request) {
        Job job = jobMapper.toEntity(request);
        Job savedJob = jobRepository.save(job);
        log.info("Created new job: {} at {}", savedJob.getTitle(), savedJob.getCompany());
        return jobMapper.toResponse(savedJob);
    }

    /**
     * Update an existing job (Admin)
     */
    @Transactional
    public JobResponse updateJob(UUID id, JobRequest request) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        
        jobMapper.updateEntity(job, request);
        Job updatedJob = jobRepository.save(job);
        log.info("Updated job: {} (ID: {})", updatedJob.getTitle(), id);
        return jobMapper.toResponse(updatedJob);
    }

    /**
     * Delete a job (Admin)
     */
    @Transactional
    public void deleteJob(UUID id) {
        if (!jobRepository.existsById(id)) {
            throw new ResourceNotFoundException("Job not found with id: " + id);
        }
        jobRepository.deleteById(id);
        log.info("Deleted job with ID: {}", id);
    }

    // Mock Job Fetcher - Runs every minute to simulate scanning
    @Scheduled(fixedRate = 60000)
    @Transactional
    public void fetchMockJobs() {
        log.info("Running scheduled job fetch...");
        
        // Only add if we have fewer than 50 jobs to avoid cluttering DB while testing
        if (jobRepository.count() > 50) {
            return;
        }

        Job mockJob = createMockJob();
        jobRepository.save(mockJob);
        log.info("Saved new mock job: {} at {}", mockJob.getTitle(), mockJob.getCompany());
    }

    private Job createMockJob() {
        String[] titles = {"Senior Java Developer", "React Frontend Engineer", "Full Stack Architect", "DevOps Engineer"};
        String[] companies = {"Google", "Amazon", "Netflix", "Startup Inc", "TechFlow"};
        String[] locations = {"Remote", "New York, NY", "San Francisco, CA", "Austin, TX"};
        
        Random rand = new Random();
        
        return Job.builder()
                .title(titles[rand.nextInt(titles.length)])
                .company(companies[rand.nextInt(companies.length)])
                .location(locations[rand.nextInt(locations.length)])
                .description("We are looking for a talented engineer to join our team. \n\n### Requirements:\n- Java 21\n- Spring Boot\n- React")
                .salaryRange("$" + (100 + rand.nextInt(50)) + "k - $" + (160 + rand.nextInt(40)) + "k")
                .postedAt(LocalDateTime.now().minusHours(rand.nextInt(24)))
                .sourceUrl("https://linkedin.com/jobs/view/123456")
                .tags(List.of("Java", "Spring Boot", "React", "Remote"))
                .build();
    }
}
