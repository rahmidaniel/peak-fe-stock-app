import {ChartPoint} from "@/interfaces/chart-point.interface";

export interface TimeSeriesData {
    information: string;
    symbol: string;
    lastRefreshed: string;
    outputSize: string;
    timeZone: string;

    items: ChartPoint[]
}

