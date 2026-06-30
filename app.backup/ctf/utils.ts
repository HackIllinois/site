export function derive(split: string[]) {
    const decoded = split.map(c => atob(c));
    return decoded.reverse().join("");
}
