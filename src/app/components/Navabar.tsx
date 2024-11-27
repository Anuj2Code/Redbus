import React from "react";
import Link from "next/link";
import img1 from "../../../public/R.gif";
import Image from "next/image";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserDropdown } from "./UserDropdown";
import prisma from "../lib/db";
import { NavbarDemo } from "./NavShow";

async function getData(email: string) {
  const data = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      createdSubbreddits: {
        select: {
          name: true,
          id: true,
          userId: true,
          User: {
            select: {
              userName: true,
            },
          },
        },
      },
    },
  });
  return data;
}

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let reddit;
  if (user) {
    const data = await getData(user?.email!);
    reddit = data?.createdSubbreddits.find((id) => id.userId === user?.id);
  }
  return (
    <nav className="h-[10vh] w-full flex items-center px-5 lg:px-14 justify-between bg-black z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-x-3">
        <div className="z-50">
          <Image
            className="rounded-full bg-black"
            src={img1}
            alt="Logo"
            width={50}
            height={50}
          />
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex">
        <NavbarDemo />
      </div>

      {/* User Controls */}
      <div className="flex items-center gap-x-4">
        <div className="flex gap-4 mt-[10px]">
          {user ? (
            <UserDropdown
              userImage={user.picture}
              reddit={reddit?.name}
              username={reddit?.User.userName!}
            />
          ) : (
            <>
              <div className="flex gap-4 z-50">
                <button className="h-[36px] w-[120px] sm:h-[40px] sm:w-[140px] md:w-[160px] bg-orange-500 text-white rounded-lg text-xs sm:text-sm md:text-base hover:bg-orange-600 transition-all duration-300">
                  <RegisterLink>Sign up</RegisterLink>
                </button>
                <button className="h-[36px] w-[120px] sm:h-[40px] sm:w-[140px] md:w-[160px] bg-orange-500 text-white rounded-lg text-xs sm:text-sm md:text-base hover:bg-orange-600 transition-all duration-300">
                  <LoginLink>Log in</LoginLink>
                </button>
              </div>

            </>
          )}
        </div>
      </div>
    </nav>
  );
}
