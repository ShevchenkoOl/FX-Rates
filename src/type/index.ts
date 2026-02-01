export interface CurrentyRate {
    [code: string]: number;
};

export interface CacheData {
    rates: CurrentyRate[],
    lastUpdated: Date | null;
};

// const update: CacheData = {
//     rates: [{usd: 40}, {eur: 50}],
//     lastUpdate: null
// };

// console.log(update);