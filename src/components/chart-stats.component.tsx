import {OverviewData} from "@/interfaces/overview-data.interface";

export function ChartStats({overviewData}: { overviewData: OverviewData }) {
    return <div className="stats shadow-lg w-full lg:stats-horizontal stats-vertical">
        <div className="stat">
            <div className="stat-title">Current Price</div>
            <div className="stat-value">{overviewData.AnalystTargetPrice}</div>
            <div className="stat-desc">{overviewData.Currency}</div>
        </div>
        <div className="stat">
            <div className="stat-title">52 Week High</div>
            <div className="stat-value">{overviewData["52WeekHigh"]}</div>
            <div className="stat-desc">{overviewData.Currency}</div>
        </div>
        <div className="stat">
            <div className="stat-title">52 Week Low</div>
            <div className="stat-value">{overviewData["52WeekLow"]}</div>
            <div className="stat-desc">{overviewData.Currency}</div>
        </div>
        <div className="stat">
            <div className="stat-title">Market Cap</div>
            <div className="stat-value">{(parseInt(overviewData.MarketCapitalization) / 1e9).toFixed(1)}B
            </div>
            <div className="stat-desc">{overviewData.Currency}</div>
        </div>
    </div>;
}