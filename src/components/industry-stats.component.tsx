import {OverviewData} from "@/interfaces/overview-data.interface";

export function IndustryStats({overviewData}: { overviewData: OverviewData }) {
    return <div className="stats shadow-lg w-full sm:max-md:stats-vertical">
        <div className="stat basis-1/2">
            <div className="stat-title">Industry</div>
            <div className="stat-value text-lg">{overviewData.Industry}</div>
            <div className="stat-desc">{overviewData.Sector}</div>
        </div>
        <div className="stat basis-1/2">
            <div className="stat-title">Exchange</div>
            <div className="stat-value text-lg">{overviewData.Exchange}</div>
            <div className="stat-desc">{overviewData.Country}</div>
        </div>
    </div>;
}