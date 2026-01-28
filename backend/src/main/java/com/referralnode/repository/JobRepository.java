package com.referralnode.repository;

import com.referralnode.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface JobRepository extends JpaRepository<Job, UUID> {
    
    // Find jobs by company name (useful for Referral agent later)
    Page<Job> findByCompanyContainingIgnoreCase(String company, Pageable pageable);
    
    // Basic search functionality
    Page<Job> findByTitleContainingIgnoreCaseOrCompanyContainingIgnoreCase(String title, String company, Pageable pageable);
}
