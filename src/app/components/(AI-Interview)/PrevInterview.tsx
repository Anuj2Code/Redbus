"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { ThreeDCardDemo } from "./InterviewCard"
import { ProgressSpinner } from "primereact/progressspinner"

export default function PreviousInterview() {
    const [interview, setInterview] = useState([])
    const [load, setLoad] = useState(false);
    const fetch = async () => {
        setLoad(true)
        try {
            const res = await axios.get("/api/getAll-interview")
            setInterview(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoad(false)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div className="h-auto">
            <h1 className="text-3xl font-medium text-green-400 pl-10">Previous Interview </h1>
            {load ? <><div className="h-[250px] w-[450px] flex justify-center items-center ">
                <ProgressSpinner />
            </div></> : <div className="flex flex-wrap gap-4">
                {interview && interview.map((item) => {
                    return <ThreeDCardDemo item={item} />
                })}
                {interview.length === 0 && <div>
                    <h1 className=" text-xl font-medium h-[150px] w-[100vw]  text-center pt-[50px]">No Previous Interview Found</h1>
                </div>}
            </div>}
        </div>
    )
}