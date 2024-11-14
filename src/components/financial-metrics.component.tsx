import React from 'react';
import {OverviewData} from "@/interfaces/overview-data.interface";

export function FinancialMetrics({overviewData}: { overviewData: OverviewData }) {
    const financialCards = [
        {
            title: "Market Capitalization",
            value: `${(parseFloat(overviewData.MarketCapitalization) / 1000000000).toFixed(2)}B`,
        },
        {
            title: "EBITDA",
            value: `${(parseFloat(overviewData.EBITDA) / 1000000000).toFixed(2)}B`,
        },
        {
            title: "Profit Margin",
            value: `${(parseFloat(overviewData.ProfitMargin) * 100).toFixed(2)}%`,
        },
        {
            title: "Operating Margin",
            value: `${(parseFloat(overviewData.OperatingMarginTTM) * 100).toFixed(2)}%`,
        },
        {
            title: "Return on Assets",
            value: `${(parseFloat(overviewData.ReturnOnAssetsTTM) * 100).toFixed(2)}%`,
        },
        {
            title: "Return on Equity",
            value: `${(parseFloat(overviewData.ReturnOnEquityTTM) * 100).toFixed(2)}%`,
        },
        {
            title: "Revenue",
            value: `${(parseFloat(overviewData.RevenueTTM) / 1000000000).toFixed(2)}B`,
        },
        {
            title: "Gross Profit",
            value: `${(parseFloat(overviewData.GrossProfitTTM) / 1000000000).toFixed(2)}B`,
        },
        {
            title: "Earnings Per Share",
            value: `${parseFloat(overviewData.DilutedEPSTTM).toFixed(2)}`,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {financialCards.map((item, index) => (
                <div className="card shadow-md p-4" key={index}>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p>{item.value}</p>
                </div>
            ))}
        </div>
    );
}
