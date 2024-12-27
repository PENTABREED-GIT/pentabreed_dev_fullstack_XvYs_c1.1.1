package com.penta.template.web.namo;

import com.penta.template.config.property.CustomYmlProperty;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.UUID;

@Slf4j
@Controller
@RequiredArgsConstructor
public class NamoController {

    private final CustomYmlProperty customYmlProperty;
    private final Environment environment;

    @GetMapping("/namo/iframe")
    public String namoIframe(
            @RequestParam("width") String width,
            @RequestParam("height") String height,
            Model model) {

        model.addAttribute("width", width);
        model.addAttribute("height", height);

        return "namo/namoIframe";
    }

    @ResponseBody
    @PostMapping("/namo/imageUpload")
    public String namoImageUpload(NamoVo namoVo) throws JSONException, IOException {

        String profile = environment.getProperty("spring.profiles.active");
        log.info("프로파일 => {}", profile  );

        log.info("namoVo = {}", namoVo);

        MultipartFile multipartFile = namoVo.getImageFile();

        String name = multipartFile.getName();
        String originalFilename = multipartFile.getOriginalFilename();
        String ext = originalFilename.substring(originalFilename.indexOf(".") + 1);
        String contentType = multipartFile.getContentType();
        long size = multipartFile.getSize();

        log.info("name = {}", name);
        log.info("originalFilename = {}", originalFilename);
        log.info("contentType = {}", contentType);
        log.info("size = {}", size);

        String saveFileName = UUID.randomUUID() + "." + ext;


        if ("local".equals(profile)) {
            log.info("로컬에 업로드합니다");
            // 8192 byte 씩 자동
            multipartFile.transferTo(new File( customYmlProperty.getKey("namo.upload.local") + saveFileName));
        } else {
            log.info("s3에 업로드 해야합니다 TODO !!!");



        }

        JSONObject innerJson = new JSONObject();
        innerJson.put("imageURL", "/namo/file?fileName=" + saveFileName);
        innerJson.put("editorFrame", namoVo.getEditorFrame());
        innerJson.put("imageKind", namoVo.getImageKind());

        JSONArray addmsg = new JSONArray();
        addmsg.put(innerJson);

        JSONObject json = new JSONObject();
        json.put("result", "success");
        json.put("addmsg", addmsg);
        return json.toString();
    }


    @GetMapping("/namo/file")
    public void namoImage(@RequestParam("fileName") String fileName, HttpServletResponse response) {

        File targetFile = new File(customYmlProperty.getKey("namo.upload.local") + fileName);
        try(OutputStream out = response.getOutputStream(); FileInputStream fileInputStream = new FileInputStream(targetFile)) {

            response.setHeader("Cache-Control", "no-cache");
            response.setHeader("Content-Disposition", "attachment; filename=" + fileName);

            // 버퍼
            byte[] buffer = new byte[1024 * 8];                     // 8 KB 8192
            while (true) {
                int count = fileInputStream.read(buffer);           // 버퍼 크기만큼 읽기
                if (count == -1) {                                  // 더이상 데이터가 없으면 -1 나오는데 이때 break
                    break;
                }
                out.write(buffer, 0, count);                    // 버퍼의 맨앞부터 끝까지를 out에 계속 씀
            }
            fileInputStream.close();
            out.flush();
        } catch(Exception e) {
            e.printStackTrace();
        }

    }
}
