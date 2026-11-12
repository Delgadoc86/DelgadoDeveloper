import type { Metadata } from "next";
import { AdminThemeShell } from "./theme-shell";

export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

// Evita el flash del tema incorrecto: aplica la preferencia guardada antes
// de que React hidrate, leyendo el mismo localStorage que usa AdminThemeShell.
// El panel arranca en claro; solo se pasa a oscuro si se eligió explícitamente.
const themeInitScript = `try{var t=localStorage.getItem("admin-theme");if(t==="dark"){document.getElementById("admin-theme-root").setAttribute("data-theme","dark");}}catch(e){}`;

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminThemeShell>
      <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      {children}
    </AdminThemeShell>
  );
}
