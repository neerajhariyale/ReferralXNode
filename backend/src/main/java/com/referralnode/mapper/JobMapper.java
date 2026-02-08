package com.referralnode.mapper;

import com.referralnode.dto.JobRequest;
import com.referralnode.dto.JobResponse;
import com.referralnode.entity.Job;
import com.referralnode.util.RichTextUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class JobMapper {
    
    private final RichTextUtil richTextUtil;
    
    public Job toEntity(JobRequest request) {
        return Job.builder()
                .title(request.getTitle())
                .company(request.getCompany())
                .location(request.getLocation())
                .description(richTextUtil.sanitizeRichText(request.getDescription()))
                .salaryRange(request.getSalaryRange())
                .postedAt(request.getPostedAt())
                .sourceUrl(request.getSourceUrl())
                .tags(request.getTags())
                .createdAt(LocalDateTime.now())
                .build();
    }
    
    public void updateEntity(Job job, JobRequest request) {
        job.setTitle(request.getTitle());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setDescription(richTextUtil.sanitizeRichText(request.getDescription()));
        job.setSalaryRange(request.getSalaryRange());
        job.setPostedAt(request.getPostedAt());
        job.setSourceUrl(request.getSourceUrl());
        job.setTags(request.getTags());
    }
    
    public JobResponse toResponse(Job job) {
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .company(job.getCompany())
                .location(job.getLocation())
                .description(job.getDescription())
                .salaryRange(job.getSalaryRange())
                .postedAt(job.getPostedAt())
                .sourceUrl(job.getSourceUrl())
                .tags(job.getTags())
                .createdAt(job.getCreatedAt())
                .build();
    }
}
