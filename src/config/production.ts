
/**
 * Production environment configuration
 */

export const config = {
  // API endpoints
  api: {
    baseUrl: "https://api.cybercrew.security", // Replace with your actual API endpoint
    timeout: 30000, // 30 seconds
  },
  
  // Feature flags
  features: {
    enableSubscriptions: true,
    enableAdvancedScans: true,
    enableRealtimeNotifications: true,
  },
  
  // Analytics and monitoring
  analytics: {
    enabled: true,
  },
  
  // Cache configuration
  cache: {
    ttl: 3600, // 1 hour in seconds
  },
};

/**
 * Determines if the app is running in production
 */
export const isProduction = (): boolean => {
  return import.meta.env.MODE === 'production';
};

/**
 * Gets configuration based on current environment
 */
export const getConfig = () => {
  return config;
};
