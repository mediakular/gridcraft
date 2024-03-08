
/**
 * Hashes the input object or string and returns a string representation of the hash.
 *
 * @param {object | string} input - The input object or string to be hashed.
 * @param {number} [seed=0] - An optional seed value for the hash.
 * @return {string} - The string representation of the hash.
 */
export function hash(input: object | string, seed = 0): string {
    const strObj = (typeof input === "number") ? (input as object).toString() : input;
    const str = (typeof strObj === "object") ? JSON.stringify(strObj) : strObj;

    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString();
}