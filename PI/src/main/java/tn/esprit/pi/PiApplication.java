package tn.esprit.pi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;  // 👈 ADD THIS IMPORT
@EnableDiscoveryClient  // 👈 ADD THIS ANNOTATION

@SpringBootApplication
public class PiApplication {

    public static void main(String[] args) {
        SpringApplication.run(PiApplication.class, args);
        System.out.println("✅ Server running on http://localhost:9090");
        System.out.println("✅ Test: http://localhost:9090/api/auth/test");
    }

}
