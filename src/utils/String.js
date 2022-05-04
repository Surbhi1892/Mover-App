/* eslint-disable no-bitwise */
/* eslint-disable no-extend-native */

function toHash(string) {
    let hash = 0;

    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
        hash &= hash;
    }
    return hash;
}

export function stringToRgb(string) {
    let hash = toHash(string);
    if (this.length === 0) return hash;
    for (let i = 0; i < this.length; i++) {
        hash = this.charCodeAt(i) + ((hash << 5) - hash);
        hash &= hash;
    }
    const rgb = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 255;
        rgb[i] = value;
    }
    console.log(string);
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}
