package com.highteequeen.highteequeen_backend.services;

import com.highteequeen.highteequeen_backend.helper.MailInfo;
import jakarta.mail.MessagingException;

public interface IMailService {
    public void send(MailInfo mail) throws MessagingException;
}
