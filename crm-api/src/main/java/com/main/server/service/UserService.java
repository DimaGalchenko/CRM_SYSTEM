package com.main.server.service;

import com.main.server.exception.ResourceAlreadyExistException;
import com.main.server.exception.ResourceNotFoundException;
import com.main.server.model.Credential;
import com.main.server.model.User;

import java.util.List;

public interface UserService {

    User getUser(Long id) throws ResourceNotFoundException;

    List<User> getAllUsers();

    User saveUser(User user) throws ResourceNotFoundException, ResourceAlreadyExistException;

    void register(Credential credential) throws ResourceAlreadyExistException, ResourceNotFoundException;

    User updateUser(Long id, User user) throws ResourceNotFoundException, ResourceAlreadyExistException;

    void deleteUser(Long id) throws ResourceNotFoundException;
}
