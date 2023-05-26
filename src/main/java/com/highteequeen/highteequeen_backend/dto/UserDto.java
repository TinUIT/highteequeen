package com.highteequeen.highteequeen_backend.dto;

public class UserDto {
    private String fullname;
    private String email;
    private String password;

    // Constructors

    public UserDto() {
    }

    public UserDto(String fullname, String email, String password) {
        this.fullname = fullname;
        this.email = email;
        this.password = password;
    }

    // Getters and setters

    public String getFullname() {
        return fullname;
    }

    public void setUsername(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
