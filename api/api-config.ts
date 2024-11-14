const baseUrl = 'https://www.alphavantage.co/query';

export const apiEndpoints = {
    search: (query: string) => `${baseUrl}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.AV_API_KEY}`,
    overview: (symbol: string) => `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.AV_API_KEY}`,
    time_series: (symbol: string, timeFrame: 'DAILY' | 'MONTHLY' | 'WEEKLY') => `${baseUrl}?function=TIME_SERIES_${timeFrame}&symbol=${symbol}&apikey=${process.env.AV_API_KEY}`,
};