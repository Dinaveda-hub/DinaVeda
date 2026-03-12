export type IndianSeason = "hemanta" | "shishira" | "vasanta" | "grishma" | "varsha" | "sharad";

/**
 * Detects the current Indian season (Shad Ritu) based on the Gregorian month.
 * 
 * Mapping:
 * Dec–Jan: Hemanta (Early Winter)
 * Feb: Shishira (Late Winter)
 * Mar–Apr: Vasanta (Spring)
 * May–Jun: Grishma (Summer)
 * Jul–Aug: Varsha (Monsoon)
 * Sep–Oct: Sharad (Autumn)
 * Nov: Hemanta (Transition)
 */
export function getIndianSeason(date: Date = new Date()): IndianSeason {
    const month = date.getMonth(); // 0-indexed (0 = Jan, 11 = Dec)
    
    switch (month) {
        case 11: // Dec
        case 0:  // Jan
        case 10: // Nov
            return "hemanta";
        case 1:  // Feb
            return "shishira";
        case 2:  // Mar
        case 3:  // Apr
            return "vasanta";
        case 4:  // May
        case 5:  // Jun
            return "grishma";
        case 6:  // Jul
        case 7:  // Aug
            return "varsha";
        case 8:  // Sep
        case 9:  // Oct
            return "sharad";
        default:
            return "vasanta"; // Fallback
    }
}
