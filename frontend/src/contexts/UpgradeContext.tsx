"use client";

import React, { createContext, useContext, useState, useRef } from "react";

/**
 * Triggers can be: 'diet', 'yoga', 'sleep', 'coach_limit', 'advanced_insights', 'soft'
 */
interface UpgradeState {
  isOpen: boolean;
  trigger?: string;
}

interface UpgradeContextType {
  state: UpgradeState;
  openUpgrade: (trigger: string) => void;
  closeUpgrade: () => void;
}

const UpgradeContext = createContext<UpgradeContextType | null>(null);

export function UpgradeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UpgradeState>({
    isOpen: false,
  });

  // Session guard: only show one hard paywall per session
  const hasShownHardPaywall = useRef(false);

  const openUpgrade = (trigger: string) => {
    // If it's a 'soft' trigger or the hard paywall hasn't been shown yet, open it.
    // This allows soft upgrade cards to always open the modal if clicked, 
    // but prevents automatic hard gates from popping up repeatedly.
    if (trigger !== 'soft' && hasShownHardPaywall.current) {
      console.log(`[UpgradeContext] Session guard: skipping hard paywall for trigger "${trigger}"`);
      return;
    }

    if (trigger !== 'soft') {
      hasShownHardPaywall.current = true;
    }

    setState({
      isOpen: true,
      trigger,
    });
  };

  const closeUpgrade = () => {
    setState({
      isOpen: false,
    });
  };

  return (
    <UpgradeContext.Provider value={{ state, openUpgrade, closeUpgrade }}>
      {children}
    </UpgradeContext.Provider>
  );
}

export function useUpgrade() {
  const ctx = useContext(UpgradeContext);
  if (!ctx) {
    throw new Error("useUpgrade must be used within an UpgradeProvider");
  }
  return ctx;
}
