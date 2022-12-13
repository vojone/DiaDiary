/**
 * General functions that can be usefull everywhere in the app
 * @author Vojtěch Dvořák (xdvora3o)
 */

/**
 * Converts numeric value to string with one decimal (where decimal point is signed by ,)
 * @param {number} value to be converted
 * @returns 
 */
export function formatOneDecimal(value) {
    return value.toFixed(1).replace('.', ',');
}
