"use client";

import PhysiologyRadar from "./PhysiologyRadar";
import { VedaState } from "@/engine/stateModel";

interface Props {
    state: VedaState;
}

/**
 * PhysiologyMap — core dashboard visualization showing only the 5 latent axes.
 * This is the high-precision focus for the Physiology Control Panel.
 */
export default function PhysiologyMap({ state }: Props) {
    const axes = [
        { label: "Vata", value: state.vata_axis, color: "#64748B" },
        { label: "Pitta", value: state.pitta_axis, color: "#F97316" },
        { label: "Kapha", value: state.kapha_axis, color: "#0EA5E9" },
        { label: "Agni", value: state.agni_axis, color: "#F97316" },
        { label: "Ojas", value: state.ojas_axis, color: "#D97706" }
    ];

    return (
        <div className="flex flex-col items-center w-full">
            <PhysiologyRadar axes={axes} />
        </div>
    );
}
