package com.referralnode.dto;

import com.referralnode.validation.ValidRichText;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobRequest {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "Company is required")
    private String company;
    
    private String location;
    
    @ValidRichText(message = "Description must be valid rich text content")
    @NotBlank(message = "Description is required")
    private String description;
    
    private String salaryRange;
    
    @NotNull(message = "Posted date is required")
    private LocalDateTime postedAt;
    
    @NotBlank(message = "Source URL is required")
    private String sourceUrl;
    
    private List<String> tags;
}
