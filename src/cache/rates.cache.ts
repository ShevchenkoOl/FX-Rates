import { CurrentyRate } from "type";

class RateCache {
    private rates: CurrentyRate[] = [];
    private lasttUpdated: Date | null = null;

    public setRates(newRates: CurrentyRate[]): void {
        this.rates = newRates;
        this.lasttUpdated = new Date();
    };

    public getAllRates(): CurrentyRate[]{
        return this.rates;
    }

    public getRateByCode(code: string): CurrentyRate | undefined {
        return this.rates.find(rate => Object.keys(rate)[0] === code.toUpperCase());
    }

    public getLastUpdated(): Date | null {
        return this.lasttUpdated;
    }
};

export const ratesCache = new RateCache();