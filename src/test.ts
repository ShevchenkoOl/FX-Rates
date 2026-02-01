import { ratesCache } from "./cache/rates.cache";
import { fetchAndStoreRates } from "./services/rates.service";

async function test() {
    console.log("Zahájení načítání dat...");
    
    // Вызываем сервис скачивания
    await fetchAndStoreRates();

    // Проверяем, что попало в кэш
    const data = ratesCache.getAllRates();
    const lastUpdate = ratesCache.getLastUpdated();

    console.log("Data v cache:", JSON.stringify(data, null, 2));
    console.log("Čas poslední aktualizace:", lastUpdate);
}

test();