import 'dotenv/config';
import express from 'express';
import { VerifyDiscordRequest } from './utils.js';
import router from './routes/index.js';
const PORT = process.env.PORT || 3000;

const app = express();
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));
app.use(router);
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
export default app;
