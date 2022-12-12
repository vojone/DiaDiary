/**
 * General functions that can be usefull everywhere in the app
 * @author Vojtěch Dvořák (xdvora3o)
 */

/**
 * 
 * @param {number} value 
 * @returns 
 */
export function formatOneDecimal(value) {
    return value.toFixed(1).replace('.', ',');
}
