"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconBrandTabler,
  IconSettings,
} from "@tabler/icons-react";
import { History, Gem, CreditCard, Crown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "../../components/ui/progress";
import axios from "axios";
import { useModal } from "../../hooks/use-modal-store";
import qs from "query-string";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "History",
    href: "/dashboard/history",
    icon: (
      <History className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Pricing",
    href: "/dashboard/bills",
    icon: (
      <Gem className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [laod, setLoad] = useState<undefined | boolean>(undefined);
  const [creditCount, setCreditCount] = useState(0);
  const [limit, setLimit] = useState(0);
  const { creditUpdate, onCredit, creditValue } = useModal()
  useEffect(() => {
    const fetchCreditCount = async () => {
      try {
        const response = await axios.get("/api/getCreditCount")
        if(creditCount>=5 && laod===false){
          setCreditCount(5)
        }else{
          setCreditCount(response.data)
        }
        creditValue(response.data)
      } catch (error) {
        console.error("Error fetching credit count:", error);
      }
    };
    fetchCreditCount();
    onCredit(false)
  }, [creditUpdate,laod]);

  useEffect(() => {
    const checkPremium = async () => {
      try {
        const url = qs.stringifyUrl({
          url: "/api/getPremiumUser"
        })
        const data = await axios.get(url);
        if (data?.data.isOk) {
          setLimit(30);
          setLoad(true)
        }
        else{
          setLimit(5)
          setLoad(false);
        }
      } catch (error) {
         console.log(error,"[Error hai on check Premium]");
      }
    }
    checkPremium()
  },[])

  
  return (
    <div className={cn(
      "rounded-md flex flex-col md:flex-row bg-black md:w-[100vw] flex-1 mx-auto  overflow-y-scroll overflow-x-hidden",
      "h-[90vh] w-[100vw]"
    )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 z-50">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
              {open && <div className="flex flex-col justify-center items-center mt-28">
                <div className="font-semibold text-left text-lg text-muted-foreground pb-3 flex gap-x-2"> <CreditCard /> Credit Used</div>
                <div><span className="">{creditCount}</span> / {limit} </div>
                <div><Progress value={ (creditCount/limit)*100} className='w-60 h-2 m-5' /></div>
              </div>}
              {open && creditCount >= 5 && laod===false && <Link href="/dashboard/bills" className="flex justify-center items-center"><button className="flex gap-x-4 justify-center items-center shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0092e4] rounded-md text-white font-light transition duration-200 ease-linear">
                <Crown className="text-yellow-400" /> upgrade
              </button></Link>}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Content Labs
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};