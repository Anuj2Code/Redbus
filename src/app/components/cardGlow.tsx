"use client";

import { CardSpotlight } from "./ui/card-spotlight";
import { useState } from "react";
import { IndianRupee, Loader2 } from "lucide-react";
import Script from "next/script";
import axios from "axios";

export interface CardGlowprops {
  title: string;
  price: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  desc: string;
  btn: string;
  type: string;
}

export function CardSpotlightDemo({ title, price, step1, step2, step3, step4, desc, btn, type }:CardGlowprops) {
  const [loading, setLoading] = useState(false);

  const createOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 150 * 100 }),
      });
      if (!res.ok) {
        throw new Error(`Failed to create order: ${res.statusText}`);
      }
      const data = await res.json();
      const paymentData = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: data.id,
        name: "Nimbus",
        description: "Monthly Subscription",
        handler: async function (response: any) {
          // Verify payment
          try {
            const res = await axios.post("/api/verifyOrder", {
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            const verificationData = res.data;
            if (verificationData.isOk) {
              alert("Payment successful ");
              window.location.reload();
            } else {
              alert("Payment failed");
            }
          } catch (error) {
            console.error("Verification failed:", error);
            alert("Payment verification failed. Please try again.");
          }
        },
      };
      const payment = new (window as any).Razorpay(paymentData);
      payment.open();
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="flex flex-col max-[600px]:relative max-[600px]:top-32">
        <CardSpotlight className="h-96 w-96">
          <p className="text-xl font-bold relative text-center z-20 mt-2 text-white">
            {title}
          </p>
          <div className="text-neutral-200 mt-4 relative  z-20">
            <div className="flex justify-center gap-x-1"> <span className="text-3xl font-extrabold">{price}</span> <IndianRupee className="h-6 w-6 font-extrabold text-white mt-1" /> <span className="mt-3">/ month</span></div>
            <ul className="list-none mt-6">
              <Step title={step1} />
              <Step title={step2} />
              <Step title={step3} />
              <Step title={step4} />
            </ul>
          </div>
          <p className="text-neutral-300 mt-4 text-left relative z-20 text-sm">
            {desc}
          </p>
        </CardSpotlight>
        {type === "paid" && <button
          onClick={createOrder}
          className="flex gap-x-4 font-medium justify-center items-center shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0092e4] text-white  transition duration-200 ease-linear"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {btn}
        </button>}
        {type === "Free" && <button
          className="flex gap-x-4 font-medium justify-center items-center shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0092e4] text-white  transition duration-200 ease-linear"
        >
          {btn}
        </button>}
      </div>
    </>
  );
}

const Step = ({ title }: { title: string }) => (
  <li className="flex gap-2 items-start">
    <CheckIcon />
    <p className="text-white">{title}</p>
  </li>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
      fill="currentColor"
      strokeWidth="0"
    />
  </svg>
);
