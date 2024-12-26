package com.penta.template.web.namo;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class NamoVo {

    // 이미지 업로드 시, 배경그림 업로드 시, 동영상 업로드 시 교집합
    private MultipartFile imageFile;
    private String imageTitle;
    private String imageAlt;
    private String imageWidth;
    private String imageWidthUnit;
    private String imageHeight;
    private String imageHeightUnit;

    private String imageAlign;
    private String imageBorder;
    private String imageKind;
    private String editorFrame;




}
