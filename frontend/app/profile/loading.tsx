import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="h-full w-full p-10">
            <Skeleton className="flex h-10 rounded" />
            <Skeleton className=" h-[82px] p-4  my-8 flex justify-around"/>
        </div>
    )
}