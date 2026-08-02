import type { Metadata } from "next";
import { AdminThemeShell } from "./theme-shell";

export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

// Evita el flash del tema incorrecto: aplica la preferencia guardada antes
// de que React hidrate, leyendo el mismo localStorage que usa AdminThemeShell.
const themeInitScript = `try{var t=localStorage.getItem("admin-theme");if(t==="light"){document.getElementById("admin-theme-root").setAttribute("data-theme","light");}}catch(e){}`;

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
