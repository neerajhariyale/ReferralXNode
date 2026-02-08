package com.referralnode.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {
    
    // Main statistics
    private Long totalJobs;
    private Long jobsPostedToday;
    private Long jobsPostedThisMonth;
    private Long totalVisitors;
    private Long activeApplications;
    
    // Growth percentages
    private Double jobsGrowthPercentage;
    private Double visitorsGrowthPercentage;
    private Double applicationsGrowthPercentage;
    
    // Job distribution by location
    private List<LocationStats> topLocations;
    
    // Job distribution by company
    private List<CompanyStats> topCompanies;
    
    // Recent activity
    private List<RecentActivity> recentActivities;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LocationStats {
        private String location;
        private Long count;
        private Double percentage;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CompanyStats {
        private String company;
        private Long count;
        private Double percentage;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecentActivity {
        private String message;
        private String time;
        private String type; // "job", "user", "system", "alert"
    }
}
