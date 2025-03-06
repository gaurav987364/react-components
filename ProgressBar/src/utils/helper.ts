export const clampValue = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
}
  
export const getPercentage = (value: number, min: number, max: number) => {
    if (max <= min) return 100;
    return ((value - min) / (max - min)) * 100;
};