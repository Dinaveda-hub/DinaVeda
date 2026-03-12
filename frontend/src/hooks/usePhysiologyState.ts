"use client";
import { usePhysiology } from '../contexts/PhysiologyContext';

/**
 * A proxy hook that now consume the global PhysiologyContext.
 * This maintains backward compatibility while ensuring state is synced across the app.
 */
export function usePhysiologyState() {
    return usePhysiology();
}
