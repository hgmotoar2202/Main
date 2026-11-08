import type { ReactNode } from 'react';

export const metadata = {
  title: 'INSURE AI',
  description: 'Gestion de accidentes y siniestros asistida por IA',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}