package com.referralnode.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobResponse {
    
    private UUID id;
    private String title;
    private String company;
    private String location;
    private String description;
    private String salaryRange;
    private LocalDateTime postedAt;
    private String sourceUrl;
    private List<String> tags;
    private LocalDateTime createdAt;
}
