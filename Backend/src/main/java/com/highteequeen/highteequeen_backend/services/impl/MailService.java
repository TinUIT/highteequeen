package com.highteequeen.highteequeen_backend.services.impl;

import com.highteequeen.highteequeen_backend.helper.MailInfo;
import com.highteequeen.highteequeen_backend.services.IMailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
@RequiredArgsConstructor
public class MailService implements IMailService {
    @Autowired
    JavaMailSender mailer;

    @Override
    public void send(MailInfo mail) throws MessagingException {
        MimeMessage message=mailer.createMimeMessage();
        MimeMessageHelper helper=new  MimeMessageHelper(message,true,"utf-8");
        helper.setFrom(mail.getFrom());
        helper.setTo(mail.getTo());
        helper.setSubject(mail.getSubject());
        helper.setText(mail.getBody(),true);
        helper.setReplyTo(mail.getFrom());

        if(mail.getCc() != null) {
            helper.setCc(mail.getCc());
        }
        if(mail.getBcc() != null) {
            helper.setBcc(mail.getBcc());
        }
        if(mail.getFiles() != null) {
            String[] paths = mail.getFiles().split(";");
            for(String path: paths) {
                File file=new File(path);
                helper.addAttachment(file.getName(), file);
            }
        }
        mailer.send(message);
    }
}
