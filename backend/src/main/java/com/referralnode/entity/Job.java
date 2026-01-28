package com.referralnode.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String company;

    private String location;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "salary_range")
    private String salaryRange;

    @Column(name = "posted_at", nullable = false)
    private LocalDateTime postedAt;

    @Column(name = "source_url", nullable = false)
    private String sourceUrl;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "tags")
    private List<String> tags;

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
