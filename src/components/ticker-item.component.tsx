import {SearchResult} from "@/interfaces/search-result.interface";
import Link from "next/link";

export function TickerItem({item}: { item: SearchResult }) {
    return (
        <div
            className="rounded-box bg-neutral text-neutral-content flex flex-row items-center p-4 w-full justify-between shadow-xl group transition ease-in-out hover:shadow-2xl hover:scale-110">
            <span className="inline-block align-middle font-extrabold text-lg basis-1/4">{item.symbol}</span>
            <span className="truncate group-hover:whitespace-normal basis-1/2">{item.name}</span>
            <Link href={`/details/${item.symbol}`} className="btn btn-primary float-right">Details</Link>
        </div>
    );
}