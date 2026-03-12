import { Protocol } from "./protocolSelectionEngine";

export type ModuleName =
  | "dinaveda"
  | "nutriveda"
  | "ayufit"
  | "manasayur"
  | "somasleep"
  | "sattvaliving"
  | "rutuveda";

/**
 * Module Engine
 *
 * Responsible for isolating protocols by module.
 * This ensures each module displays only its own protocol set.
 */

import { getIndianSeason } from "@/utils/seasonalUtils";

export function getProtocolsForModule(
  protocols: Protocol[],
  module: ModuleName
): Protocol[] {
  // Case-insensitive filtering for robust JSON mapping
  const targetModule = module.toLowerCase();
  const filtered = protocols.filter(protocol => 
    protocol.module?.toLowerCase() === targetModule
  );
  
  // Seasonal Isolation for Rutuveda
  if (targetModule === "rutuveda") {
      const currentSeason = getIndianSeason();
      return filtered.filter(p => !p.season || p.season.includes(currentSeason));
  }
  
  return filtered;
}

/**
 * Helper to return protocols grouped by module.
 */
export function groupProtocolsByModule(
  protocols: Protocol[]
): Record<ModuleName, Protocol[]> {
  const modules: Record<ModuleName, Protocol[]> = {
    dinaveda: [],
    nutriveda: [],
    ayufit: [],
    manasayur: [],
    somasleep: [],
    sattvaliving: [],
    rutuveda: []
  };

  for (const protocol of protocols) {
    const rawModule = protocol.module?.toLowerCase() as ModuleName;
    if (modules[rawModule]) {
      modules[rawModule].push(protocol);
    }
  }

  return modules;
}
