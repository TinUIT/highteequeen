package com.highteequeen.highteequeen_backend.helper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MailInfo {
    private String  from;
    private String to;
    private String cc;
    private String bcc;
    private String subject;
    private String body;
    private String files;
    public MailInfo(String from, String to, String subject, String body) {
        super();
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.body = body;
    }
}
