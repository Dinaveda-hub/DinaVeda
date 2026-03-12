import { Protocol } from "./protocolSelectionEngine";

export interface ProtocolWithStatus extends Protocol {
    is_premium?: boolean;
}

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
  const filtered = protocols.filter(protocol => protocol.module === module);
  
  // Seasonal Isolation for Rutuveda
  if (module === "rutuveda") {
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
    const module = protocol.module as ModuleName;
    if (modules[module]) {
      modules[module].push(protocol);
    }
  }

  return modules;
}
