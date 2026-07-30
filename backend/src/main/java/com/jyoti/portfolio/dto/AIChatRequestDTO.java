package com.jyoti.portfolio.dto;

public class AIChatRequestDTO {
    private String message;

    public AIChatRequestDTO() {
    }

    public AIChatRequestDTO(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
