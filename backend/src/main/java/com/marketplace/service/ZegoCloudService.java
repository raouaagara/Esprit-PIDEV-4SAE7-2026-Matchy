package com.marketplace.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

@Service
public class ZegoCloudService {

    @Value("${zegocloud.app-id}")
    private int appId;

    /**
     * 32-character Server Secret from ZegoCloud Console.
     * Go to: https://console.zegocloud.com → your project → AppID & Server Secret.
     * This is NOT the 64-char AppSign — it is the separate 32-char Server Secret.
     */
    @Value("${zegocloud.server-secret}")
    private String serverSecret;

    private static final ObjectMapper MAPPER = new ObjectMapper();

    /**
     * Generates a Token04 whose binary layout matches ZegoCloud UIKit Prebuilt's
     * generateKitTokenForTest internal format:
     *
     *   [4 bytes : 0x00000000 reserved]
     *   [4 bytes : expireTime big-endian int32]
     *   [2 bytes : IV length (16)]
     *   [16 bytes: IV (UTF-8 chars of a 16-digit random decimal string)]
     *   [2 bytes : encrypted-data length]
     *   [N bytes : AES-256-CBC(JSON payload)]
     *
     * Key = serverSecret.getBytes(UTF-8)  — must be exactly 32 characters.
     * Final token = "04" + Base64(buffer)
     */
    public String generateToken(String userId, int effectiveSeconds) {
        try {
            long createTime = System.currentTimeMillis() / 1000;
            long expireTime  = createTime + effectiveSeconds;

            Map<String, Object> tokenInfo = new LinkedHashMap<>();
            tokenInfo.put("app_id",  appId);
            tokenInfo.put("user_id", userId);
            tokenInfo.put("nonce",   new Random().nextInt(Integer.MAX_VALUE));
            tokenInfo.put("ctime",   createTime);
            tokenInfo.put("expire",  expireTime);

            byte[] payload = MAPPER.writeValueAsString(tokenInfo).getBytes(StandardCharsets.UTF_8);

            // Key: server secret as raw UTF-8 bytes (32 chars → 32 bytes = AES-256)
            byte[] key = serverSecret.getBytes(StandardCharsets.UTF_8);

            // IV: 16-character random decimal string encoded as UTF-8
            String ivStr = randomDecimalString(16);
            byte[] iv    = ivStr.getBytes(StandardCharsets.UTF_8);

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE,
                    new SecretKeySpec(key, "AES"),
                    new IvParameterSpec(iv));
            byte[] encrypted = cipher.doFinal(payload);

            // Assemble buffer (28 header bytes + encrypted data)
            ByteBuffer buf = ByteBuffer.allocate(4 + 4 + 2 + iv.length + 2 + encrypted.length);
            buf.order(ByteOrder.BIG_ENDIAN);
            buf.put(new byte[4]);                        // 4 reserved zero bytes
            buf.putInt((int) expireTime);                // expire timestamp
            buf.putShort((short) iv.length);             // IV length = 16
            buf.put(iv);                                 // IV bytes
            buf.putShort((short) encrypted.length);      // encrypted data length
            buf.put(encrypted);                          // encrypted data

            return "04" + java.util.Base64.getEncoder().encodeToString(buf.array());

        } catch (Exception e) {
            throw new RuntimeException("ZegoCloud token generation failed: " + e.getMessage(), e);
        }
    }

    public String generateRoomId(String prefix) {
        return prefix + "-" + UUID.randomUUID().toString().replace("-", "").substring(0, 10);
    }

    public int getAppId() { return appId; }

    private static String randomDecimalString(int length) {
        StringBuilder sb = new StringBuilder(length);
        Random rng = new Random();
        for (int i = 0; i < length; i++) sb.append(rng.nextInt(10));
        return sb.toString();
    }
}
