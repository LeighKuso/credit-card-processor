export default function getStorageValue(key, defaultValue) {
    // getting stored value
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem(key);
        const initial = !saved ? defaultValue : JSON.parse(saved);
        return initial;
    }
}