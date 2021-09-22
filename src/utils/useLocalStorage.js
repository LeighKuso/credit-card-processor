import { useState, useEffect } from "react";
import getStorageValue from "./getStorageValue";

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, initialValue);
    });

    useEffect(() => {
        // storing input name
        localStorage.setItem(key, JSON.stringify(value));
        return () => {
            localStorage.clear();
        }
    }, [key, value]);

    return [value, setValue];
}