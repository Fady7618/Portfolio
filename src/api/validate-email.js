// /api/validate-email.js
export default async function handler(req, res) {
  const { email } = req.query;
  const apiKey = process.env.ZEROBOUNCE_API;
  
  try {
    const response = await fetch(
      `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${encodeURIComponent(email)}`
    );
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}