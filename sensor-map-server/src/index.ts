import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from "@hono/node-server";
import { loadEnvFile } from 'node:process';
import { parseIntFromEnv } from "./util";
import { join } from "node:path";

import data from './data.json' with {type: "json"};

const currentDirectory = import.meta.dirname;
loadEnvFile(join(currentDirectory, '../.env'));

const app = new Hono()

// Middleware
if(process.env.ENABLE_CORS_MIDDLEWARE) {
  app.use('/*', cors())
}

// Routes
app.get('/', (c) => {


  return c.json(data)
})

app.get('/health', (c) => {
  return c.json({ status: 'ok' })
});


const defaultPort = 3000;
const port = parseIntFromEnv(process.env.SERVE_PORT, defaultPort);
serve({
  fetch: app.fetch,
  port,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

export default app