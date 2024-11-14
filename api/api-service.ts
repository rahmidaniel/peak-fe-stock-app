import {apiEndpoints} from "./api-config";
import {SearchResults} from "./interfaces/search-results.interface";
import * as mockSearch from "../mock_data/search_view/search-result.json";
import * as mockOverview from "../mock_data/details_view/overview.json";
import * as mockTimeSeries from "../mock_data/details_view/time-series-daily.json";
import {OverviewData} from "@/interfaces/overview-data.interface";
import {TimeSeriesData} from "@/interfaces/time-series-data.interface";
import {ChartPoint} from "@/interfaces/chart-point.interface";
import {SearchResult} from "@/interfaces/search-result.interface";
import {MetaData} from "./interfaces/meta-data.interface";
import {TimeSeriesItem} from "./interfaces/time-series-item.interface";

const isMockData = false;

export const apiService = {
    getSearchResults: async (query: string): Promise<SearchResult[]> => isMockData ? mapSearchResults(mockSearch) : get(apiEndpoints.search(query)).then(mapSearchResults),

    getOverview: async (symbol: string): Promise<OverviewData> => isMockData ? mockOverview : get(apiEndpoints.overview(symbol)),
    getDailyTimeSeries: async (symbol: string): Promise<TimeSeriesData | undefined> => isMockData ? mapTimeSeries(mockTimeSeries) : get(apiEndpoints.time_series(symbol, 'DAILY')).then(mapTimeSeries)
};

async function get<T>(path: string): Promise<T> {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return response.json();
}

export function mapTimeSeries(apiResponse: any): TimeSeriesData | undefined {
    const metaData = apiResponse["Meta Data"] as MetaData;
    const timeSeries = (apiResponse["Time Series (Daily)"] || apiResponse["Monthly Time Series"] || apiResponse["Weekly Time Series"]) as Record<string, TimeSeriesItem>;

    if(!metaData || !timeSeries) {
        return undefined;
    }

    const items: ChartPoint[] = Object.entries(timeSeries).map(([date, data]: [string, TimeSeriesItem]) => ({
        date,
        open: parseFloat(data["1. open"]),
        high: parseFloat(data["2. high"]),
        low: parseFloat(data["3. low"]),
        close: parseFloat(data["4. close"]),
        volume: parseInt(data["5. volume"], 10)
    }));

    return {
        information: metaData["1. Information"],
        symbol: metaData["2. Symbol"],
        lastRefreshed: metaData["3. Last Refreshed"],
        outputSize: metaData["4. Output Size"],
        timeZone: metaData["5. Time Zone"],
        items
    };
}

function mapSearchResults(searchResults: unknown): SearchResult[] {
    return (searchResults as SearchResults).bestMatches.map(item => ({
        symbol: item["1. symbol"],
        name: item["2. name"],
        region: item["4. region"],
    }));
}