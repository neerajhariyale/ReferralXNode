package com.referralnode.specification;

import com.referralnode.entity.Job;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class JobSpecification {
    
    public static Specification<Job> filterJobs(
            String company,
            String location,
            String title,
            List<String> tags) {
        
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            // Filter by company (case-insensitive partial match)
            if (company != null && !company.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("company")),
                        "%" + company.toLowerCase() + "%"
                ));
            }
            
            // Filter by location (case-insensitive partial match)
            if (location != null && !location.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("location")),
                        "%" + location.toLowerCase() + "%"
                ));
            }
            
            // Filter by title (case-insensitive partial match)
            if (title != null && !title.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("title")),
                        "%" + title.toLowerCase() + "%"
                ));
            }
            
            // Filter by tags (check if any tag matches)
            if (tags != null && !tags.isEmpty()) {
                List<Predicate> tagPredicates = new ArrayList<>();
                for (String tag : tags) {
                    // PostgreSQL array contains check
                    tagPredicates.add(criteriaBuilder.isTrue(
                            criteriaBuilder.function(
                                    "array_contains",
                                    Boolean.class,
                                    root.get("tags"),
                                    criteriaBuilder.literal(tag.trim())
                            )
                    ));
                }
                predicates.add(criteriaBuilder.or(tagPredicates.toArray(new Predicate[0])));
            }
            
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
