export async function validateEmailWithZeroBounce(
  email: string
): Promise<{ isValid: boolean; message: string }> {
  // Basic email validation regex as fallback
  const isEmailFormatValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  try {
    // Use the API route to avoid CORS issues
    const response = await fetch(
      `/api/validate-email?email=${encodeURIComponent(email)}`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // ZeroBounce status codes
    // 'valid' - Email is valid
    // 'invalid' - Email is invalid
    // 'catch-all' - Domain has a catch-all policy
    // 'unknown' - Email validity unknown
    // 'spamtrap' - Email is a spam trap
    // 'abuse' - Email is associated with abuse
    // 'do_not_mail' - Do not mail this email
    
    const validStatuses = ['valid', 'catch-all'];
    const isValid = validStatuses.includes(data.status?.toLowerCase());
    
    return {
      isValid,
      message: isValid ? '' : 'Please enter a valid email address'
    };
  } catch (error) {
    console.error('ZeroBounce API error:', error);
    
    // Fall back to basic validation if API fails
    const isValid = isEmailFormatValid(email);
    return {
      isValid,
      message: isValid ? '' : 'Please enter a valid email address'
    };
  }
}