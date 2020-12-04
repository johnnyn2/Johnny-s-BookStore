package com.johnny.bookstore.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.mail.util.ByteArrayDataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import freemarker.cache.ClassTemplateLoader;
import freemarker.cache.TemplateLoader;
import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;

public class EmailUtil {
    private static final String NOREPLY_ADDRESS = "noreply@johnnybookstore.com";

    @Autowired
    private JavaMailSender emailSender;
    
    @Autowired
    private SpringTemplateEngine thymeleafTemplateEngine;
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    public void sendMimeMessage(String[] to, String subject, String htmlText) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(NOREPLY_ADDRESS);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlText, true);
            emailSender.send(message);
        } catch (Exception e) {
        	logger.error("Email address(es): {}", to.toString());
            logger.error("MailUtil Exception: {}", e);
        }
    }
    
	public void sendMessageUsingFreemarkerWithAttachment(String[] to, String subject, String template, Map<String, Object> templateModel, ByteArrayOutputStream file, String attachmentName, String fileType) throws IOException, TemplateException, MessagingException {
		try {
			MimeMessage message = emailSender.createMimeMessage();
			// pass 'true' to the constructor to create a multipart message
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
			helper.setFrom(NOREPLY_ADDRESS);
			helper.setTo(to);
            helper.setSubject(subject);
            FreeMarkerConfigurer freemarkerConfigurer = new FreeMarkerConfigurer();
            Configuration configuration = new Configuration(Configuration.VERSION_2_3_27);
            TemplateLoader templateLoader = new ClassTemplateLoader(this.getClass(), "/mail-templates");
            configuration.setTemplateLoader(templateLoader);
            freemarkerConfigurer.setConfiguration(configuration);
			Template freemarkerTemplate = freemarkerConfigurer.getConfiguration().getTemplate(template);
			String htmlText = FreeMarkerTemplateUtils.processTemplateIntoString(freemarkerTemplate, templateModel);
			helper.setText(htmlText, true);
			helper.addAttachment(attachmentName, new ByteArrayDataSource(file.toByteArray(), fileType));
			emailSender.send(message);
		} catch (Exception e) {
			logger.error("Email address(es): {}", to.toString());
			e.printStackTrace();
			logger.error(e.getMessage(), e);
		}
	}
    
    public void sendMessageUsingFreemarkerTemplate(String[] to, String subject, String template, Map<String, Object> templateModel) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
        FreeMarkerConfigurer freemarkerConfigurer = new FreeMarkerConfigurer();
        Configuration configuration = new Configuration(Configuration.VERSION_2_3_27);
        TemplateLoader templateLoader = new ClassTemplateLoader(this.getClass(), "/mail-templates");
        configuration.setTemplateLoader(templateLoader);
        freemarkerConfigurer.setConfiguration(configuration);
        Template freemarkerTemplate = freemarkerConfigurer.getConfiguration().getTemplate(template);
        String htmlBody = FreeMarkerTemplateUtils.processTemplateIntoString(freemarkerTemplate, templateModel);
        sendMimeMessage(to, subject, htmlBody);
    }

    public void sendMessageUsingThymeleafTemplate(String[] to, String subject, String template, Map<String, Object> templateModel)
            throws MessagingException {
        Context thymeleafContext = new Context();
        thymeleafContext.setVariables(templateModel);
        String htmlBody = thymeleafTemplateEngine.process(template, thymeleafContext);
        sendMimeMessage(to, subject, htmlBody);
    }

    public void sendMessageUsingThymeleafWithAttachment(String[] to, String subject, String template, Map<String, Object> templateModel, ByteArrayOutputStream file, String attachmentName, String fileType) throws IOException, TemplateException, MessagingException {
		try {
			MimeMessage message = emailSender.createMimeMessage();
			// pass 'true' to the constructor to create a multipart message
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
			helper.setFrom(NOREPLY_ADDRESS);
			helper.setTo(to);
			helper.setSubject(subject);
			Context thymeleafContext = new Context();
            thymeleafContext.setVariables(templateModel);
            String htmlBody = thymeleafTemplateEngine.process(template, thymeleafContext);
			helper.setText(htmlBody, true);
			helper.addAttachment(attachmentName, new ByteArrayDataSource(file.toByteArray(), fileType));
			emailSender.send(message);
		} catch (Exception e) {
			logger.error("Email address(es): {}", to.toString());
			e.printStackTrace();
			logger.error(e.getMessage(), e);
		}
	}
}
