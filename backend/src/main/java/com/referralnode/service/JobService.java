package com.referralnode.service;

import com.referralnode.entity.Job;
import com.referralnode.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobService {

    private final JobRepository jobRepository;

    public Page<Job> getJobs(Pageable pageable) {
        return jobRepository.findAll(pageable);
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
