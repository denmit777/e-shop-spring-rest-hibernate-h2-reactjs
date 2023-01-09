package com.training.eshop.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CommentDto {

    private static final String WRONG_SIZE_OF_COMMENT = "Comment shouldn't be more than 300 symbols";
    private static final String WRONG_COMMENT = "Comment should be in latin letters";

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

    private String user;

    @Pattern(regexp = "^[^А-Яа-я]*$", message = WRONG_COMMENT)
    @Size(max = 300, message = WRONG_SIZE_OF_COMMENT)
    private String text;
}
