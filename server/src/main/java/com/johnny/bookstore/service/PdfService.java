package com.johnny.bookstore.service;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.io.StringWriter;
import java.util.Locale;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfig;
import org.xhtmlrenderer.pdf.ITextRenderer;

import freemarker.template.Configuration;
import freemarker.template.Template;

@Service
public class PdfService {
    @Autowired
    private FreeMarkerConfig freeMarkerConfig;
    
    protected final Logger logger = LoggerFactory.getLogger(getClass());

    public ByteArrayOutputStream exportInvoice(Map<String, Object> data) throws Exception {
        Configuration cfg = new Configuration(Configuration.DEFAULT_INCOMPATIBLE_IMPROVEMENTS);
        cfg.setClassForTemplateLoading(PdfService.class, "pdf-templates/");
        cfg.setEncoding(Locale.ENGLISH, "UTF-8");

        ITextRenderer renderer = new ITextRenderer();
        OutputStream out = new ByteArrayOutputStream();
        try {
            Template freemarkerTemplate = freeMarkerConfig.getConfiguration().getTemplate("pdf-templates/invoice.ftl", "UTF-8");
            StringWriter writer = new StringWriter();
            freemarkerTemplate.process(data, writer);
            writer.flush();

            String html = writer.toString();

            renderer.setDocumentFromString(html);
            renderer.layout();
            renderer.createPDF(out, false);
            renderer.finishPDF();
            out.flush();

            return (ByteArrayOutputStream) out;
        } finally {
            if (out != null) out.close(); 
        }
    }
}
