package com.referralnode.service;

import com.referralnode.dto.DashboardStatsResponse;
import com.referralnode.model.Job;
import com.referralnode.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final JobRepository jobRepository;

    public DashboardStatsResponse getDashboardStats() {
        // Get all jobs
        List<Job> allJobs = jobRepository.findAll();
        
        // Calculate date ranges
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfToday = now.toLocalDate().atStartOfDay();
        LocalDateTime startOfMonth = now.withDayOfMonth(1).toLocalDate().atStartOfDay();
        LocalDateTime startOfLastMonth = startOfMonth.minusMonths(1);
        
        // Total jobs
        long totalJobs = allJobs.size();
        
        // Jobs posted today
        long jobsPostedToday = allJobs.stream()
                .filter(job -> job.getCreatedAt().isAfter(startOfToday))
                .count();
        
        // Jobs posted this month
        long jobsPostedThisMonth = allJobs.stream()
                .filter(job -> job.getCreatedAt().isAfter(startOfMonth))
                .count();
        
        // Jobs posted last month (for growth calculation)
        long jobsPostedLastMonth = allJobs.stream()
                .filter(job -> job.getCreatedAt().isAfter(startOfLastMonth) 
                        && job.getCreatedAt().isBefore(startOfMonth))
                .count();
        
        // Calculate growth percentage
        double jobsGrowthPercentage = calculateGrowthPercentage(jobsPostedThisMonth, jobsPostedLastMonth);
        
        // Mock data for visitors and applications (can be replaced with real data later)
        long totalVisitors = 12345L;
        long activeApplications = 156L;
        double visitorsGrowthPercentage = 12.0;
        double applicationsGrowthPercentage = 23.0;
        
        // Get top locations
        List<DashboardStatsResponse.LocationStats> topLocations = getTopLocations(allJobs);
        
        // Get top companies
        List<DashboardStatsResponse.CompanyStats> topCompanies = getTopCompanies(allJobs);
        
        // Get recent activities
        List<DashboardStatsResponse.RecentActivity> recentActivities = getRecentActivities(allJobs);
        
        return DashboardStatsResponse.builder()
                .totalJobs(totalJobs)
                .jobsPostedToday(jobsPostedToday)
                .jobsPostedThisMonth(jobsPostedThisMonth)
                .totalVisitors(totalVisitors)
                .activeApplications(activeApplications)
                .jobsGrowthPercentage(jobsGrowthPercentage)
                .visitorsGrowthPercentage(visitorsGrowthPercentage)
                .applicationsGrowthPercentage(applicationsGrowthPercentage)
                .topLocations(topLocations)
                .topCompanies(topCompanies)
                .recentActivities(recentActivities)
                .build();
    }
    
    private double calculateGrowthPercentage(long current, long previous) {
        if (previous == 0) {
            return current > 0 ? 100.0 : 0.0;
        }
        return ((double) (current - previous) / previous) * 100.0;
    }
    
    private List<DashboardStatsResponse.LocationStats> getTopLocations(List<Job> jobs) {
        Map<String, Long> locationCounts = jobs.stream()
                .collect(Collectors.groupingBy(Job::getLocation, Collectors.counting()));
        
        long total = jobs.size();
        
        return locationCounts.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(5)
                .map(entry -> DashboardStatsResponse.LocationStats.builder()
                        .location(entry.getKey())
                        .count(entry.getValue())
                        .percentage(total > 0 ? (entry.getValue() * 100.0 / total) : 0.0)
                        .build())
                .collect(Collectors.toList());
    }
    
    private List<DashboardStatsResponse.CompanyStats> getTopCompanies(List<Job> jobs) {
        Map<String, Long> companyCounts = jobs.stream()
                .collect(Collectors.groupingBy(Job::getCompany, Collectors.counting()));
        
        long total = jobs.size();
        
        return companyCounts.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(5)
                .map(entry -> DashboardStatsResponse.CompanyStats.builder()
                        .company(entry.getKey())
                        .count(entry.getValue())
                        .percentage(total > 0 ? (entry.getValue() * 100.0 / total) : 0.0)
                        .build())
                .collect(Collectors.toList());
    }
    
    private List<DashboardStatsResponse.RecentActivity> getRecentActivities(List<Job> jobs) {
        List<DashboardStatsResponse.RecentActivity> activities = new ArrayList<>();
        
        // Get the 5 most recent jobs
        List<Job> recentJobs = jobs.stream()
                .sorted(Comparator.comparing(Job::getCreatedAt).reversed())
                .limit(5)
                .collect(Collectors.toList());
        
        for (Job job : recentJobs) {
            String timeAgo = getTimeAgo(job.getCreatedAt());
            String message = String.format("New job posted: %s at %s", job.getTitle(), job.getCompany());
            
            activities.add(DashboardStatsResponse.RecentActivity.builder()
                    .message(message)
                    .time(timeAgo)
                    .type("job")
                    .build());
        }
        
        return activities;
    }
    
    private String getTimeAgo(LocalDateTime dateTime) {
        LocalDateTime now = LocalDateTime.now();
        long minutes = ChronoUnit.MINUTES.between(dateTime, now);
        long hours = ChronoUnit.HOURS.between(dateTime, now);
        long days = ChronoUnit.DAYS.between(dateTime, now);
        
        if (minutes < 60) {
            return minutes + " minute" + (minutes != 1 ? "s" : "") + " ago";
        } else if (hours < 24) {
            return hours + " hour" + (hours != 1 ? "s" : "") + " ago";
        } else if (days < 30) {
            return days + " day" + (days != 1 ? "s" : "") + " ago";
        } else {
            long months = days / 30;
            return months + " month" + (months != 1 ? "s" : "") + " ago";
        }
    }
}
