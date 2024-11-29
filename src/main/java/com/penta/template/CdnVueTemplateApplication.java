package com.penta.template;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;


// 뷰 할떄동안은 디비 끄고..
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class CdnVueTemplateApplication {

    public static void main(String[] args) {
        SpringApplication.run(CdnVueTemplateApplication.class, args);
    }



}
