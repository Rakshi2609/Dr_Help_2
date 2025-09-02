'use client';

import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Define the authentication context types
type AuthContextType = {
  isAuthenticated: boolean;
  userRole: string | null;
  token: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  token: null,
  login: () => {},
  logout: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const pathname = usePathname();
  
  // Check for token on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('userRole');
    
    if (storedToken && storedRole) {
      setToken(storedToken);
      setUserRole(storedRole);
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  }, []);
  
  // Auth status debugging
  useEffect(() => {
    if (isLoading) return;
    
    // Log authentication state for debugging
    console.log('Auth state:', {
      isAuthenticated,
      userRole,
      pathname,
      hasToken: !!token
    });
    
    // Only handle role-based protection (middleware handles the rest)
    if (isAuthenticated) {
      // Route protection based on role
      if (userRole === 'doctor' && pathname.startsWith('/patient')) {
        console.log('Doctor attempting to access patient routes, redirecting...');
        router.push('/doctor/dashboard');
      }
      
      if (userRole === 'patient' && pathname.startsWith('/doctor')) {
        console.log('Patient attempting to access doctor routes, redirecting...');
        router.push('/patient/dashboard');
      }
    }
  }, [isAuthenticated, userRole, pathname, router, isLoading, token]);
  
  // Login function
  const login = (newToken: string, role: string, name?: string) => {
    // Import and use storeAuthData for consistency
    import('@/lib/cookies').then(({ storeAuthData }) => {
      // Store in both localStorage and cookies
      storeAuthData(newToken, role, name);
      
      setToken(newToken);
      setUserRole(role);
      setIsAuthenticated(true);
      
      // Let the component handle navigation, don't redirect here
      console.log('Auth provider: Login successful for role:', role);
    });
  };
  
  // Logout function
  const logout = () => {
    // Clear both localStorage and cookies
    import('@/lib/cookies').then(({ clearAuthData }) => {
      clearAuthData();
      
      setToken(null);
      setUserRole(null);
      setIsAuthenticated(false);
      
      router.push('/auth/login');
    });
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, token, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// Hook for using the auth context
export const useAuth = () => useContext(AuthContext);
