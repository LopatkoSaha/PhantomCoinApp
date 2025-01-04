import { useState, useEffect } from "react";

interface localStorageProps {
  name: string;
  value: Record<string, number>;
}

export const useLocalStorage = () => {
  const [stor, setStor] = useState<Record<string, number>>({});

  const getLocalStorage = ({ name, value }: localStorageProps) => {
    const init = localStorage.getItem(name);
    if (!init) {
      localStorage.setItem(name, JSON.stringify(value));
      setStor(value);
    } else {
      setStor(JSON.parse(init));
    }
  };

  const setLocalStorage = ({ name, value }: localStorageProps) => {
    localStorage.setItem(name, JSON.stringify(value));
    setStor(value);
  };

  return {
    stor,
    getLocalStorage,
    setLocalStorage,
  };
};
