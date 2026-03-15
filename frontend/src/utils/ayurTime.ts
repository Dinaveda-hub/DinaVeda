/**
 * Detects the Ayurvedic season based on the current month.
 * Note: These are standard Northern Hemisphere mappings. 
 * Can be refined with latitude-based logic if needed.
 */
export const getAyurvedicSeason = (): string => {
    const month = new Date().getMonth(); // 0-indexed (0 = Jan, 11 = Dec)
    
    // Mapping:
    // Hemanta (Early Winter): Nov, Dec
    // Shishira (Late Winter): Jan, Feb
    // Vasanta (Spring): Mar, Apr
    // Grishma (Summer): May, Jun
    // Varsha (Monsoon): Jul, Aug
    // Sharad (Autumn): Sep, Oct
    
    if (month === 10 || month === 11) return "Hemanta";
    if (month === 0 || month === 1) return "Shishira";
    if (month === 2 || month === 3) return "Vasanta";
    if (month === 4 || month === 5) return "Grishma";
    if (month === 6 || month === 7) return "Varsha";
    if (month === 8 || month === 9) return "Sharad";
    
    return "Unknown";
};
