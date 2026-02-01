export interface CurrentyRate {
    [code: string]: number;
};

export interface CacheData {
    rates: CurrentyRate[],
    lastUpdated: Date | null;
};
