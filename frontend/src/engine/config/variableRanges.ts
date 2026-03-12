/**
 * Standard ranges for all variables in the 0-100 physiology space.
 */

export const VARIABLE_MIN = 0;
export const VARIABLE_MAX = 100;
export const DEFAULT_SCORE = 50;

/**
 * Clamps a value into the valid 0-100 physiology range.
 * Essential for preventing engine variable overflow.
 */
export function clamp(value: number): number {
  return Math.min(VARIABLE_MAX, Math.max(VARIABLE_MIN, value));
}
