import { useState, useEffect } from "react";
import getStorageValue from "./getStorageValue";

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, initialValue);
    });

    useEffect(() => {
        // storing input name
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}