// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';

// import * as schema from './schema';

// const sql = neon(process.env.NEW_NEON_DATABASE_URL!);
// console.log(process.env.NEW_NEON_DATABASE_URL);

// export const db = drizzle(sql, { schema });
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';



if (!process.env.NEW_NEON_DATABASE_URL) {
  throw new Error("NEW_NEON_DATABASE_URL is missing");
}

const sql = neon(process.env.NEW_NEON_DATABASE_URL);

export const db = drizzle(sql, { schema });
