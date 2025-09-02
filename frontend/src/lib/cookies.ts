'use client';

import { Dispatch, SetStateAction } from 'react';

// Cookie utility functions
export function setCookie(name: string, value: string, days: number = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + 
    '; expires=' + expires + 
    '; path=/' + 
    '; SameSite=Lax';
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

export function deleteCookie(name: string) {
  document.cookie = name + '=; Max-Age=-99999999; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

// Auth functions
export function storeAuthData(token: string, role: string, name?: string) {
  // Store in both localStorage and cookies
  // localStorage is used by components that need to access this data
  // cookies are used by the middleware for server-side auth checks
  localStorage.setItem('token', token);
  localStorage.setItem('userRole', role);
  
  // Store user name if available
  if (name) {
    localStorage.setItem('userName', name);
  } else {
    // Set a default name based on role if no name is provided
    localStorage.setItem('userName', role === 'doctor' ? 'Doctor' : 'Patient');
  }
  
  // Set cookies with 7-day expiry
  setCookie('token', token, 7);
  setCookie('userRole', role, 7);
  if (name) {
    setCookie('userName', name, 7);
  }
  
  // Dispatch custom event for components to detect auth changes
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth-changed'));
  }
}

export function clearAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  
  deleteCookie('token');
  deleteCookie('userRole');
  deleteCookie('userName');
  
  // Dispatch custom event for components to detect auth changes
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth-changed'));
  }
}
