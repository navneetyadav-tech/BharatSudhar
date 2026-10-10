/* oxlint-disable react/only-export-components */
import { createContext, useContext, useState } from 'react';
import type { CitizenProfile } from '../types';
import { MOCK_CITIZEN } from '../data/mockDashboardData';

export interface LoginEmailData {
  name?: string;
  email: string;
  state?: string;
  district?: string;
  city?: string;
  phone?: string;
}

export interface AuthorityLoginData {
  name?: string;
  email: string;
  department?: string;
  municipality?: string;
  designation?: string;
}

export const MOCK_AUTHORITY: CitizenProfile = {
  id: 'AUTH-PMC-2026-09',
  name: 'Er. Rajesh Deshmukh',
  avatar: 'RD',
  ward: 'Ward 45-B (Shivajinagar-Kothrud)',
  city: 'Pune',
  district: 'Pune',
  state: 'Maharashtra',
  email: 'rajesh.deshmukh@pmc.gov.in',
  pincode: '411005',
  role: 'Executive Ward Officer',
  isVerified: true,
  isAuthority: true,
  department: 'Solid Waste Management & Public Works',
  designation: 'Executive Ward Engineer (Class I)',
  municipality: 'Pune Municipal Corporation (PMC)',
  badgeNumber: 'PMC-EWO-45',
  civicKarma: 950,
  level: 5,
  levelTitle: 'Municipal Authority Head',
  nextLevelKarma: 1000,
  joinedDate: 'Joined March 2024',
  stats: {
    totalReported: 148,
    totalResolved: 139,
    inAction: 9,
    avgResolutionHours: 24,
    upvotesReceived: 840,
  },
};

interface AuthContextType {
  user: CitizenProfile | null;
  isAuthenticated: boolean;
  isAuthority: boolean;
  isLoginModalOpen: boolean;
  loginModalMode: 'login' | 'signup';
  loginType: 'citizen' | 'authority';
  openLoginModal: (mode?: 'login' | 'signup', type?: 'citizen' | 'authority') => void;
  closeLoginModal: () => void;
  setLoginModalMode: (mode: 'login' | 'signup') => void;
  setLoginType: (type: 'citizen' | 'authority') => void;
  loginAsDemo: () => void;
  loginAsAuthorityDemo: () => void;
  loginWithPhone: (phone: string, name?: string, ward?: string) => void;
  loginWithEmail: (data: LoginEmailData) => void;
  loginAsAuthority: (data: AuthorityLoginData) => void;
  signUp: (data: LoginEmailData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Read persisted user account from localStorage so users don't have to log in repeatedly
  const [user, setUser] = useState<CitizenProfile | null>(() => {
    try {
      const stored = localStorage.getItem('bharat_sudhar_user');
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object' && parsed.name) {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalMode, setLoginModalMode] = useState<'login' | 'signup'>('login');
  const [loginType, setLoginType] = useState<'citizen' | 'authority'>('citizen');

  const openLoginModal = (mode: 'login' | 'signup' = 'login', type: 'citizen' | 'authority' = 'citizen') => {
    setLoginModalMode(mode);
    setLoginType(type);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => setIsLoginModalOpen(false);

  const loginAsDemo = () => {
    setUser(MOCK_CITIZEN);
    localStorage.setItem('bharat_sudhar_user', JSON.stringify(MOCK_CITIZEN));
    localStorage.setItem('bharat_sudhar_citizen_name', MOCK_CITIZEN.name);
    localStorage.setItem('bharat_sudhar_auth', 'true');
    setIsLoginModalOpen(false);
  };

  const loginAsAuthorityDemo = () => {
    setUser(MOCK_AUTHORITY);
    localStorage.setItem('bharat_sudhar_user', JSON.stringify(MOCK_AUTHORITY));
    localStorage.setItem('bharat_sudhar_citizen_name', MOCK_AUTHORITY.name);
    localStorage.setItem('bharat_sudhar_auth', 'true');
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
    localStorage.setItem('bharat_sudhar_citizen_name', customUser.name);
    localStorage.setItem('bharat_sudhar_auth', 'true');
    setIsLoginModalOpen(false);
  };

  const loginWithEmail = (data: LoginEmailData) => {
    // Check if user already exists in registered accounts list
    let existingUser: CitizenProfile | null = null;
    try {
      const existing = localStorage.getItem('bharat_sudhar_registered_users');
      if (existing) {
        const list = JSON.parse(existing);
        existingUser = list.find((u: CitizenProfile) => u.email?.toLowerCase() === data.email.toLowerCase()) || null;
      }
    } catch {
      // Fallback
    }

    const userName = existingUser?.name || data.name?.trim() || (data.email.split('@')[0].charAt(0).toUpperCase() + data.email.split('@')[0].slice(1)) || 'Maharashtra Nagrik';

    const initials = (existingUser?.avatar || userName)
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'MH';

    const customUser: CitizenProfile = existingUser || {
      id: `CIT-MH-${Date.now().toString().slice(-4)}`,
      name: userName,
      avatar: initials,
      ward: `${data.city || 'Central'} Ward`,
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
    localStorage.setItem('bharat_sudhar_citizen_name', customUser.name);
    localStorage.setItem('bharat_sudhar_auth', 'true');
    setIsLoginModalOpen(false);
  };

  const signUp = (data: LoginEmailData) => {
    const rawName = data.name?.trim() || 'Maharashtra Nagrik';
    const initials = rawName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'MH';

    const newUser: CitizenProfile = {
      id: `CIT-MH-${Date.now().toString().slice(-4)}`,
      name: rawName,
      avatar: initials,
      ward: `${data.city || 'Central'} Ward`,
      city: data.city || 'Pune City',
      district: data.district || 'Pune',
      state: data.state || 'Maharashtra',
      email: data.email,
      pincode: '411001',
      role: 'Registered Maharashtra Nagrik',
      isVerified: true,
      civicKarma: 100, // 100 welcome Karma for joining
      level: 1,
      levelTitle: 'Active Nagrik',
      nextLevelKarma: 200,
      joinedDate: 'Joined Today',
      stats: {
        totalReported: 0,
        totalResolved: 0,
        inAction: 0,
        avgResolutionHours: 24,
        upvotesReceived: 0,
      },
    };

    setUser(newUser);
    localStorage.setItem('bharat_sudhar_user', JSON.stringify(newUser));
    localStorage.setItem('bharat_sudhar_citizen_name', newUser.name);
    localStorage.setItem('bharat_sudhar_auth', 'true');

    // Persist in registered users registry
    try {
      const existing = localStorage.getItem('bharat_sudhar_registered_users');
      const list = existing ? JSON.parse(existing) : [];
      const updated = [newUser, ...list.filter((u: CitizenProfile) => u.email !== newUser.email)];
      localStorage.setItem('bharat_sudhar_registered_users', JSON.stringify(updated));
    } catch {
      // Fallback
    }

    setIsLoginModalOpen(false);
  };

  const loginAsAuthority = (data: AuthorityLoginData) => {
    const authorityName = data.name?.trim() || 'Er. Rajesh Deshmukh';
    const initials = authorityName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'MH';

    const authorityUser: CitizenProfile = {
      id: `AUTH-MH-${Date.now().toString().slice(-4)}`,
      name: authorityName,
      avatar: initials,
      ward: 'Ward 45-B (Shivajinagar-Kothrud)',
      city: 'Pune',
      district: 'Pune',
      state: 'Maharashtra',
      email: data.email,
      pincode: '411005',
      role: 'Executive Ward Officer',
      isVerified: true,
      isAuthority: true,
      department: data.department || 'Solid Waste Management & Public Works',
      designation: data.designation || 'Executive Ward Engineer (Class I)',
      municipality: data.municipality || 'Pune Municipal Corporation (PMC)',
      badgeNumber: 'PMC-EWO-45',
      civicKarma: 950,
      level: 5,
      levelTitle: 'Municipal Authority Head',
      nextLevelKarma: 1000,
      joinedDate: 'Joined March 2024',
      stats: {
        totalReported: 148,
        totalResolved: 139,
        inAction: 9,
        avgResolutionHours: 24,
        upvotesReceived: 840,
      },
    };

    setUser(authorityUser);
    localStorage.setItem('bharat_sudhar_user', JSON.stringify(authorityUser));
    localStorage.setItem('bharat_sudhar_citizen_name', authorityUser.name);
    localStorage.setItem('bharat_sudhar_auth', 'true');
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bharat_sudhar_user');
    localStorage.removeItem('bharat_sudhar_citizen_name');
    localStorage.removeItem('bharat_sudhar_auth');
  };

  const isAuthority = user !== null && (user.isAuthority === true || user.role === 'Executive Ward Officer');

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isAuthority,
        isLoginModalOpen,
        loginModalMode,
        loginType,
        openLoginModal,
        closeLoginModal,
        setLoginModalMode,
        setLoginType,
        loginAsDemo,
        loginAsAuthorityDemo,
        loginWithPhone,
        loginWithEmail,
        loginAsAuthority,
        signUp,
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
