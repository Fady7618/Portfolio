export async function validateEmailWithZeroBounce(
  email: string
): Promise<{ isValid: boolean; message: string }> {
  // Basic email validation regex 
  const isEmailFormatValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Use basic validation for production
  if (window.location.hostname !== 'localhost') {
    return {
      isValid: isEmailFormatValid(email),
      message: isEmailFormatValid(email) ? '' : 'Please enter a valid email address'
    };
  }

  try {
    // For local development only - won't work in production
    const apiKey = import.meta.env.VITE_ZEROBOUNCE_API;
    const response = await fetch(
      `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${encodeURIComponent(email)}`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    const validStatuses = ['valid', 'catch-all'];
    const isValid = validStatuses.includes(data.status?.toLowerCase());
    
    return {
      isValid,
      message: isValid ? '' : 'Please enter a valid email address'
    };
  } catch (error) {
    console.error('ZeroBounce API error:', error);
    
    // Fall back to basic validation
    const isValid = isEmailFormatValid(email);
    return {
      isValid,
      message: isValid ? '' : 'Please enter a valid email address'
    };
  }
}