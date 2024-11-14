import {apiService} from "../../../../api/api-service";
import Image from "next/image";
import {FinancialMetrics} from "@/components/financial-metrics.component";
import {IndustryStats} from "@/components/industry-stats.component";
import {CandleChart} from "@/components/candle-chart.component";
import {ChartStats} from "@/components/chart-stats.component";
import {OverviewData} from "@/interfaces/overview-data.interface";

export default async function Page({params}: {
    params: Promise<{ symbol: string }>
}) {

    const symbol = (await params).symbol;
    const overviewData: OverviewData = await apiService.getOverview(symbol);
    const timeSeriesData = await apiService.getDailyTimeSeries(symbol);

    if (Object.keys(overviewData).length === 0) {
        return (
            <div className="container mx-auto p-6">
                <p className="text-center text-lg text-error">Error: Overview data not available:(</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-7xl font-bold text-center mb-8">{overviewData.Symbol}</h1>

            <div className="flex flex-wrap gap-6">
                <CandleChart data={timeSeriesData}/>
                <ChartStats overviewData={overviewData}/>
            </div>

            <div className="mt-8 flex sm:flex-row flex-col justify-between items-center">
                <h2 className="text-2xl font-bold">{overviewData.Name}</h2>
                <a href={overviewData.OfficialSite}
                   className="font-semibold text-md btn btn-secondary btn-xs sm:btn-sm md:btn-md lg:btn-lg">
                    <Image
                        src="./globe.svg"
                        alt="Website"
                        className="h-4 w-4 opacity-70"
                        width={16}
                        height={16}/>
                    Official Site
                </a>
            </div>

            <div className="mt-8 flex flex-col">
                <IndustryStats overviewData={overviewData}/>

                <h3 className="text-xl font-semibold mb-2 mt-6">Description</h3>
                <p className="text-base-content mb-6">{overviewData.Description}</p>

                <h3 className="text-xl font-semibold">Financial Metrics
                    <span className="font-normal"> in {overviewData.Currency}</span>
                </h3>
                <FinancialMetrics overviewData={overviewData}/>
            </div>
        </div>
    );
}