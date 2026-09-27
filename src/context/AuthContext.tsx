/* oxlint-disable react/only-export-components */
import { createContext, useContext, useState } from 'react';
import type { CitizenProfile } from '../types';
import { MOCK_CITIZEN } from '../data/mockDashboardData';

export interface LoginEmailData {
  name: string;
  email: string;
  state: string;
  district: string;
  city: string;
}

interface AuthContextType {
  user: CitizenProfile | null;
  isAuthenticated: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  loginAsDemo: () => void;
  loginWithPhone: (phone: string, name?: string, ward?: string) => void;
  loginWithEmail: (data: LoginEmailData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Start as null so fresh visitors are not automatically logged in
  const [user, setUser] = useState<CitizenProfile | null>(() => {
    try {
      const stored = localStorage.getItem('bharat_sudhar_user');
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      // Clean up stale Kavita demo from storage if present
      if (parsed?.name === 'Kavita Verma') {
        localStorage.removeItem('bharat_sudhar_user');
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const loginAsDemo = () => {
    setUser(MOCK_CITIZEN);
    localStorage.setItem('bharat_sudhar_user', JSON.stringify(MOCK_CITIZEN));
    setIsLoginModalOpen(false);
  };

  const loginWithPhone = (phone: string, name = 'Citizen Nagrik', ward = 'Ward 45-B') => {
    const customUser: CitizenProfile = {
      id: `CIT-${phone.slice(-4) || '2026'}-${Date.now().toString().slice(-4)}`,
      name: name.trim() || 'Citizen Nagrik',
      avatar: (name.trim() || 'CN').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
      ward,
      city: 'Pune',
      district: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
      role: 'Registered Citizen',
      isVerified: true,
      civicKarma: 50,
      level: 1,
      levelTitle: 'Active Nagrik',
      nextLevelKarma: 150,
      joinedDate: 'Joined Today',
      stats: {
        totalReported: 3,
        totalResolved: 2,
        inAction: 1,
        avgResolutionHours: 24,
        upvotesReceived: 12,
      },
    };

    setUser(customUser);
    localStorage.setItem('bharat_sudhar_user', JSON.stringify(customUser));
    setIsLoginModalOpen(false);
  };

  const loginWithEmail = (data: LoginEmailData) => {
    const initials = (data.name.trim() || 'Nagrik')
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'MH';

    const customUser: CitizenProfile = {
      id: `CIT-MH-${Date.now().toString().slice(-4)}`,
      name: data.name.trim() || 'Maharashtra Nagrik',
      avatar: initials,
      ward: `${data.city} Ward`,
      city: data.city || 'Pune City',
      district: data.district || 'Pune',
      state: data.state || 'Maharashtra',
      email: data.email,
      pincode: '411001',
      role: 'Registered Maharashtra Nagrik',
      isVerified: true,
      civicKarma: 50,
      level: 1,
      levelTitle: 'Active Nagrik',
      nextLevelKarma: 150,
      joinedDate: 'Joined Today',
      stats: {
        totalReported: 3,
        totalResolved: 2,
        inAction: 1,
        avgResolutionHours: 24,
        upvotesReceived: 15,
      },
    };

    setUser(customUser);
    localStorage.setItem('bharat_sudhar_user', JSON.stringify(customUser));
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bharat_sudhar_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        loginAsDemo,
        loginWithPhone,
        loginWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
