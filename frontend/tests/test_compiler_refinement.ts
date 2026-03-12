import { compileDailyProtocols } from '../src/engine/protocolCompiler';
import { Protocol } from '../src/engine/protocolSelectionEngine';

console.log("=== Protocol Compiler Refinement Test ===");

const mockProtocols: Protocol[] = [
    // Morning bucket
    { name: "m1", category: "cat1", time_of_day: "morning", score: 1.5, instructions: "", module: "", duration: "", variables: {}, contraindications: [] },
    { name: "m2", category: "cat1", time_of_day: "morning", score: 1.5, instructions: "", module: "", duration: "", variables: {}, contraindications: [] },
    { name: "m3", category: "cat1", time_of_day: "morning", score: 1.5, instructions: "", module: "", duration: "", variables: {}, contraindications: [] }, // Should be dropped (m1, m2 already take 2 from cat1)
    { name: "m4", category: "cat2", time_of_day: "morning", score: 2.5, instructions: "", module: "", duration: "", variables: {}, contraindications: [] }, // High score bypasses cat guard
    { name: "m5", category: "cat2", time_of_day: "morning", score: 1.5, instructions: "", module: "", duration: "", variables: {}, contraindications: [] },
    { name: "m6", category: "cat2", time_of_day: "morning", score: 1.5, instructions: "", module: "", duration: "", variables: {}, contraindications: [] }, // Should be dropped (limit 3 per bucket)

    // Midday bucket & Fallback
    { name: "d1", category: "cat3", time_of_day: "midday", score: 1.5, instructions: "", module: "", duration: "", variables: {}, contraindications: [] },
    { name: "f1", category: "cat3", time_of_day: "unknown", score: 1.5, instructions: "", module: "", duration: "", variables: {}, contraindications: [] }, // Fallback to midday
    { name: "d2", category: "cat3", time_of_day: "midday", score: 1.5, instructions: "", module: "", duration: "", variables: {}, contraindications: [] }, // Should be dropped (midday limit 2)

    // Evening bucket
    { name: "e1", category: "cat4", time_of_day: "evening", score: 1.5, instructions: "", module: "", duration: "", variables: {}, contraindications: [] },
    { name: "e2", category: "cat4", time_of_day: "evening", score: 1.5, instructions: "", module: "", duration: "", variables: {}, contraindications: [] },
    { name: "e3", category: "cat5", time_of_day: "evening", score: 1.5, instructions: "", module: "", duration: "", variables: {}, contraindications: [] }
];

const plan = compileDailyProtocols(mockProtocols);

console.log("\nMorning:", plan.morning.map(p => p.name).join(", "));
console.log("Midday:", plan.midday.map(p => p.name).join(", "));
console.log("Evening:", plan.evening.map(p => p.name).join(", "));

// Assertions
const morningNames = plan.morning.map(p => p.name);
const middayNames = plan.midday.map(p => p.name);

if (morningNames.length === 3 && morningNames.includes("m4")) {
    console.log("✅ Bucket Capping & Priority Bypass Success (Morning)");
} else {
    console.error("❌ Bucket Capping or Priority Bypass Failed (Morning)", morningNames);
}

if (middayNames.includes("f1")) {
    console.log("✅ TOD Fallback Success (f1 mapped to midday)");
} else {
    console.error("❌ TOD Fallback Failed");
}

const cat1Count = plan.morning.filter(p => p.category === "cat1").length + 
                 plan.midday.filter(p => p.category === "cat1").length +
                 plan.evening.filter(p => p.category === "cat1").length;

if (cat1Count <= 2) {
    console.log("✅ Category Diversity Guard Success (cat1 count:", cat1Count, ")");
} else {
    console.error("❌ Category Diversity Guard Failed (cat1 count:", cat1Count, ")");
}
