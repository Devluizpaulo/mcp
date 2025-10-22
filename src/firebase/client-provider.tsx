'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeClientFirebase } from '@/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    try {
      // Initialize Firebase on the client side, once per component mount.
      return initializeClientFirebase();
    } catch (error) {
      console.error('Failed to initialize Firebase:', error);
      // Return a fallback object to prevent the app from crashing
      return {
        firebaseApp: null,
        auth: null,
        firestore: null,
      };
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // If Firebase initialization failed, render children without Firebase context
  if (!firebaseServices.firebaseApp) {
    return <>{children}</>;
  }

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
