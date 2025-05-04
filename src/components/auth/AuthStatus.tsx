'use client'

export default function AuthStatus() {
  // Check if the user is logged in by looking for the 'is-logged' cookie in the browser
  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  const isLoggedIn = getCookie('is-logged') === 'true';

  // Return the login status as a prop that can be used by client components
  return { isLoggedIn };
}
