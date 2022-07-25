package com.main.server.dto;

import com.main.server.entity.Sex;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Date birthDate;
    private String residentialAddress;
    private Sex sex;
    private long[] roleIds;
}