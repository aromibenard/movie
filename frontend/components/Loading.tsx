import { ClimbingBoxLoader } from "react-spinners";

export default function Loading() {
    return (
        <div className="w-full h-dvh grid items-center justify-center">
            <div className="w-full mx-auto">
                {/* <h1 className="text-xl font-bold my-2">Loading...</h1> */}
                <ClimbingBoxLoader/>
            </div>
        </div>
    )
}