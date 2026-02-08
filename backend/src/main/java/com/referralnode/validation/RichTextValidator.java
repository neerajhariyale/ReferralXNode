package com.referralnode.validation;

import com.referralnode.util.RichTextUtil;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * Validator implementation for ValidRichText annotation
 */
@Component
@RequiredArgsConstructor
public class RichTextValidator implements ConstraintValidator<ValidRichText, String> {
    
    private final RichTextUtil richTextUtil;
    private boolean allowEmpty;
    
    @Override
    public void initialize(ValidRichText constraintAnnotation) {
        this.allowEmpty = constraintAnnotation.allowEmpty();
    }
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // Null check
        if (value == null) {
            return allowEmpty;
        }
        
        // Empty check
        if (richTextUtil.isEmpty(value)) {
            return allowEmpty;
        }
        
        // Validate HTML content
        if (!richTextUtil.isValidRichText(value)) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                "Rich text content contains invalid or potentially dangerous HTML"
            ).addConstraintViolation();
            return false;
        }
        
        return true;
    }
}
