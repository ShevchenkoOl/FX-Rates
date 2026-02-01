import dotenv from 'dotenv';
dotenv.config();

import app from "./app";
import { fetchAndStoreRates } from "./services/rates.service";

const PORT = process.env.PORT || 3000;
const UPDATE_INTERVAL = 10 * 60 * 1000;

async function startServer(){
    await fetchAndStoreRates();
    setInterval(async () => {
        await fetchAndStoreRates();
    }, UPDATE_INTERVAL);

    app.listen(PORT, () => {
    console.log(`FX Rates Backend běží na http://localhost:${PORT}`);
    console.log(`Healthcheck: http://localhost:${PORT}/healthcheck`);
})
};

startServer();

