import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3001),
  MONGODB_URI: z.string().min(1).default('mongodb://localhost:27017/insure_ai'),
  AI_PROVIDER: z.enum(['simulated', 'anthropic']).default('simulated'),
  JWT_SECRET: z.string().min(16).default('solo-para-desarrollo-cambiar'),
  STORAGE_DIR: z.string().min(1).default('./storage'),
});

export type Env = z.infer<typeof EnvSchema>;

/** Valida la configuracion al arrancar; si es invalida, el proceso no inicia. */
export function loadEnv(source: NodeJS.ProcessEnv): Env {
  const parsed = EnvSchema.safeParse(source);
  if (!parsed.success) {
    throw new Error(`Configuracion invalida: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`);
  }
  return parsed.data;
}