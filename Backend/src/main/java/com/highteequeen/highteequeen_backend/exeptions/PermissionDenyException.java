package com.highteequeen.highteequeen_backend.exeptions;

public class PermissionDenyException extends Exception{
    public PermissionDenyException(String message) {
        super(message);
    }
}
