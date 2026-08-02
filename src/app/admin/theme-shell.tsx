"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "admin-theme";
const THEME_EVENT = "admin-theme-change";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | null>(null);

export function useAdminTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useAdminTheme debe usarse dentro de AdminThemeShell");
  return ctx;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

function getSnapshot(): Theme {
  return window.localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function AdminThemeShell({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  // localStorage.setItem no dispara "storage" en la misma pestaña que hizo el
  // cambio, por eso toggle() también dispara THEME_EVENT para que este
  // componente se vuelva a renderizar con el valor nuevo.
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    rootRef.current?.setAttribute("data-theme", theme);
  }, [theme]);

  function toggle() {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div
        id="admin-theme-root"
        ref={rootRef}
        data-theme="dark"
        className="bg-background text-foreground min-h-dvh"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
