package com.highteequeen.highteequeen_backend.service;

import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

public class GooglePhotosService {

    private String accessToken = "ya29.a0AWY7CklaVnBpEKPjO8NwPND0BQPlQZs8U5_fZS8eyojUwQo2LP3MpLuzWd0r3Ev569QFjgQr8nKmVN2VXAn_MI9yucC5pIKdtiyNofRGFHEbC4WUPwJpidUh1Vkv3MF0DXXaLy_qOz9bcE81rbNqM9Pxgpx1aCgYKAbgSARASFQG1tDrpNmUk1QKWnTPnuDb-aPLeTw0163" ;

    public void uploadPhoto(byte[] photoBytes) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setBearerAuth(accessToken);

        HttpEntity<byte[]> requestEntity = new HttpEntity<>(photoBytes, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(
                "https://photoslibrary.googleapis.com/v1/uploads",
                requestEntity,
                String.class
        );

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            String uploadToken = responseEntity.getBody();

            createMediaItem(uploadToken);
        } else {
            // handle error
        }
    }

    private void createMediaItem(String uploadToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        // for simplicity, we're adding the photo to the "default" album
        String requestBody = "{"
                + "\"newMediaItems\": [{"
                + "\"description\": \"Photo uploaded by my Spring Boot app\","
                + "\"simpleMediaItem\": {\"uploadToken\": \"" + uploadToken + "\"}"
                + "}]"
                + "}";

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(
                "https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate",
                requestEntity,
                String.class
        );

        if (responseEntity.getStatusCode() != HttpStatus.OK) {
            // handle error
        }
    }
}

