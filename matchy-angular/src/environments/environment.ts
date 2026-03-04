// Direct connection to PI Service (faster for development)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:9090/api',  // Direct to PI Service
  appName: 'Matchy',
  version: '1.0.0'
};

// To use API Gateway instead, change apiUrl to: 'http://localhost:8081/api'
// Gateway provides: load balancing, service discovery, centralized routing
