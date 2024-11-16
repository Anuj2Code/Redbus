"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { History } from "lucide-react";
import { ProgressSpinner } from "primereact/progressspinner";


export default function TableDemo() {
    const { data, isLoading ,error} = useQuery({
        queryKey: ["get-Payment-detail"],
        queryFn: async() => {
            return axios.get("/api/get-Payment-detail")
        }
    })
    
    if(isLoading){
      return <div className="h-full w-full flex justify-center items-center"><ProgressSpinner/></div>
    }
    if(data?.data?.result.length===0){
      return <div className="h-full w-full flex justify-center items-center text-2xl gap-3"><History className="h-8 w-8 text-white"/> No Histroy</div>
    }

    return (
        <div className="flex justify-center items-center w-[100vw]">
            <Table className="w-[80vw]">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Payment_ID</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">Email</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.result.map((item: any) => {
                        return (<TableRow key={item.id}>
                            <TableCell className="font-medium">{item.paymentId}</TableCell>
                            <TableCell className="text-center">{item.active ? "paid" : "unpaid"}</TableCell>
                            <TableCell className="text-center">{item.email}</TableCell>
                            <TableCell className="text-right">{150}</TableCell>
                        </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">{data?.data?.result.length*150}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
