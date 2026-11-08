import { EXTRACTION_SCHEMA_VERSION } from '@insure/contracts';

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>INSURE AI</h1>
      <p>Plataforma de gestion de accidentes y siniestros asistida por IA. En construccion.</p>
      <p>Contrato de extraccion: {EXTRACTION_SCHEMA_VERSION}</p>
    </main>
  );
}