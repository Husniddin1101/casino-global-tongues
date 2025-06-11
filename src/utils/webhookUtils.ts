
export const processWebhookResponse = (data: any): string => {
  // Handle different response formats from the webhook
  if (typeof data === 'string') {
    return data;
  }
  
  if (data && typeof data === 'object') {
    // Check for common response properties
    if (data.response) {
      return data.response;
    }
    if (data.message) {
      return data.message;
    }
    if (data.text) {
      return data.text;
    }
    if (data.content) {
      return data.content;
    }
    
    // If it's an object but no known properties, stringify it
    return JSON.stringify(data);
  }
  
  // Fallback for any other type
  return String(data);
};
