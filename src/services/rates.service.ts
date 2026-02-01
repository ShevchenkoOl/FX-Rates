import axios from "axios";
import { ratesCache } from "../cache/rates.cache";
import { CurrentyRate } from "type";

const API_URL = `https://api.frankfurter.app/latest?from=CZK`;

export async function fetchAndStoreRates(): Promise<void>{
try {
    const res = await axios.get(API_URL);
    const ratesData = res.data.rates;
    const formatedRates: CurrentyRate[] = Object.keys(ratesData).map(code =>({
        [code]: +(1 / ratesData[code]).toFixed(2)
    }));
    ratesCache.setRates(formatedRates);
    console.log(`[${new Date().toLocaleDateString()}] Kurzy byly úspěšně aktualizovány z Frankfurter API.`);
} catch (error) {
    console.error("Chyba při stahování dat:", error);
}
};