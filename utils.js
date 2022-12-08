/**
 * 
 * @param {number} value 
 * @returns 
 */
export function formatOneDecimal(value) {
    return value.toFixed(1).replace('.', ',');
}
