'use client'

import {useState} from "react";
import Image from "next/image";
import {TickerList} from "@/components/ticker-list.component";
import {apiService} from "../../api/api-service";
import {SearchResult} from "@/interfaces/search-result.interface";

export default function Home() {
    const [searchInput, setSearchInput] = useState<string>('');
    const [results, setResults] = useState<SearchResult[]>();

    async function handleSearch(event) {
        const keyword = event.target.value?.trim();
        setSearchInput(keyword);
        setResults(keyword ? await apiService.getSearchResults(keyword) : undefined);
    }

    return (
        <div className="flex flex-col w-2/3 mx-auto align-middle">
            <div className="hero mt-32">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Stock Search App</h1>
                        <p className="py-6">
                            Start searching for stocks and companies based on their market symbol and check out their detailed views.
                        </p>
                        <label className="input input-bordered flex items-center gap-2 mx-auto">
                            <input
                                tabIndex={0}
                                type="text"
                                value={searchInput}
                                onChange={handleSearch}
                                placeholder="Search..."
                                className="grow"/>
                            <Image
                                src="./search.svg"
                                alt="Search"
                                className="h-4 w-4 opacity-70"
                                width={16}
                                height={16}
                                priority/>
                        </label>
                    </div>
                </div>
            </div>

            <TickerList searchResults={results}></TickerList>
        </div>
    );
}
