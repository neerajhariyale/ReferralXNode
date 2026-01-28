package com.referralnode.controller;

import com.referralnode.entity.Job;
import com.referralnode.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @GetMapping
    public ResponseEntity<Page<Job>> getAllJobs(@PageableDefault(size = 10, sort = "postedAt") Pageable pageable) {
        return ResponseEntity.ok(jobService.getJobs(pageable));
    }
}
