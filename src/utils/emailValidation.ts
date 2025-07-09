export async function validateEmailWithZeroBounce(
  email: string,
  apiKey: string
): Promise<{ isValid: boolean; message: string }> {
  try {
    // Use a CORS proxy service
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const response = await fetch(
      `${proxyUrl}https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${encodeURIComponent(email)}`
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
    // If API call fails, return valid so the form still works
    return {
      isValid: true,
      message: ''
    };
  }
}