'use client'

import * as d3 from "d3";
import {MutableRefObject, useEffect, useRef} from "react";
import {TimeSeriesData} from "@/interfaces/time-series-data.interface";

export function CandleChart({data, baseWidth = 800, baseHeight = 300}: {
    data?: TimeSeriesData,
    baseWidth?: number,
    baseHeight?: number
}) {
    const chartRef = useRef('');

    const margin = {top: 20, right: 30, bottom: 30, left: 50};
    const width = baseWidth - margin.left - margin.right;
    const height = baseHeight - margin.top - margin.bottom;
    const createChart = (chartRef: MutableRefObject<HTMLDivElement>) => {
        const svg = d3.select(chartRef.current)
            .html("")
            .append('svg')
            .attr('viewBox', `0 0 ${baseWidth} ${baseHeight}`)
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .append('g')
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3.scaleBand()
            .domain(data!.items.map(d => d.date))
            .range([0, width])
            .padding(0.3);

        const yScale = d3.scaleLinear()
            .domain([
                d3.min(data!.items, d => d.low) as number,
                d3.max(data!.items, d => d.high) as number
            ])
            .range([height, 0]);

        const xTickValues = data!.items
            .map(d => d.date)
            .filter((_, i, arr) => i === 0 || i === Math.floor(arr.length / 2) || i === arr.length - 1);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).tickValues(xTickValues))
            .selectAll("text");

        svg.append("g")
            .call(d3.axisLeft(yScale));

        svg.selectAll(".candlestick")
            .data(data!.items)
            .join(
                enter => {
                    const g = enter.append("g")
                        .attr("class", "candlestick");

                    g.append("line")
                        .attr("x1", d => xScale(d.date)! + xScale.bandwidth() / 2)
                        .attr("x2", d => xScale(d.date)! + xScale.bandwidth() / 2)
                        .attr("y1", d => yScale(d.low))
                        .attr("y2", d => yScale(d.high))
                        .attr("stroke", "currentColor");

                    g.append("rect")
                        .attr("x", d => xScale(d.date)!)
                        .attr("y", d => yScale(Math.max(d.open, d.close)))
                        .attr("width", xScale.bandwidth())
                        .attr("height", d => Math.abs(yScale(d.open) - yScale(d.close)))
                        .attr("fill", d => d.close > d.open ? "green" : "red");

                    return g;
                },
                update => update,
                exit => exit.remove()
            );
    }

    useEffect(() => {
        if (data && chartRef.current) {
            createChart(chartRef);
        }
    }, [data, chartRef]);

    return (
        // @ts-ignore
        <div className="flex-1 bg-base-200 rounded-md shadow-md p-4 mx-auto" ref={chartRef}>
            {!data && (<p className="text-center text-lg text-neutral-content">Time series data not available:(</p>)}
        </div>
    );
}