"use client";

import toast from "react-hot-toast";

// export const getFromLocalStorage = (key: string) => {
//   return JSON.parse(localStorage.getItem(key) as string);
// };

export const getFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  if (value !== null) {
    try {
      return JSON.parse(value);
    } catch (error: any) {
      toast.error(error.message, { duration: 2500 });
      return null;
    }
  }
  return null;
};

