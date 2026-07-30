package com.jyoti.portfolio.dto;

import java.time.LocalDateTime;

public class AIChatResponseDTO {
    private boolean success;
    private String userQuery;
    private String reply;
    private LocalDateTime timestamp;

    public AIChatResponseDTO() {
    }

    public AIChatResponseDTO(boolean success, String userQuery, String reply) {
        this.success = success;
        this.userQuery = userQuery;
        this.reply = reply;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getUserQuery() {
        return userQuery;
    }

    public void setUserQuery(String userQuery) {
        this.userQuery = userQuery;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
