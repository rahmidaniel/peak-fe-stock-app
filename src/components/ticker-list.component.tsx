import {SearchResult} from "@/interfaces/search-result.interface";
import {TickerItem} from "@/components/ticker-item.component";

export function TickerList({searchResults}: { searchResults?: SearchResult[] }) {
    return (
        <div className="flex flex-row flex-wrap gap-2 justify-between">
            {searchResults && searchResults.length > 0 ? (
                searchResults.map((item: SearchResult, index: number) =>
                    <TickerItem item={item} key={index}/>
                )
            ) : (
                searchResults && <p className="text-center text-lg text-base-300">No results found:(</p>
            )}
        </div>
    );
}