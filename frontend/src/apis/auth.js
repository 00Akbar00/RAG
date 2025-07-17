import { BASE_URL } from '../config/apiConfig';

export const signup = async (
  username,
  email,
  password,
  confirmPassword     // ← match your component’s state name
) => {
  const response = await fetch(`${BASE_URL}register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept':       'application/json',   
    },
    body: JSON.stringify({
      user_name:             username,       
      email,
      password,
      password_confirmation: confirmPassword 
    }),
  });

  // parse JSON once
  const data = await response.json();

  if (!response.ok) {
    // throws error.message (from Laravel) or a fallback
    throw new Error(data.message || 'Could not create account.');
  }

  return data;  // your 201 payload
};


export const login = async (email, password) => {
  // Path now matches the proxy key
  const response = await fetch(`${BASE_URL}login`, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials.');
    } else {
        throw new Error('Server returned a non-JSON response.');
    }
  }

  return response.json();
};