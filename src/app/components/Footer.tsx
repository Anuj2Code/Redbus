'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaGithub, FaSquareXTwitter } from 'react-icons/fa6'
import img1 from "../../../public/R.gif"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const footerLinks = [
        {
            title: 'Legal',
            links: [
                { name: 'Terms & Conditions', href: '/legal/terms-and-conditions' },
            ],
        },
    ]

    const socialLinks = [
        { name: 'Twitter', href: 'https://x.com/Ankit__46', icon: FaSquareXTwitter },
        { name: 'GitHub', href: 'https://github.com/Anuj2Code/Reddit', icon: FaGithub },
    ]

    return (
        <footer className="mt-10 text-white" aria-hidden="true">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="flex items-center group">
                            <Image
                                src={img1}
                                alt="DataNode Logo"
                                width={50}
                                height={50}
                                className="mr-2 transition-transform duration-300"
                            />
                            <span className="font-medium text-2xl">Nimbus</span>
                        </Link>
                        <div className="flex items-center gap-6 my-8 pl-3">
                            {socialLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-all duration-300 hover:scale-110"
                                    aria-label={`Visit our ${link.name} page`}
                                >
                                    <link.icon size={32} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="flex flex-col sm:flex-row items-center sm:justify-between text-muted-foreground">
                    <span className="text-sm text-center sm:text-left">
                        Nimbus © {currentYear} | All rights reserved
                    </span>
                    <div className="mt-4 sm:mt-0">

                        Powered By Next.js
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-custom-gradient transition-all duration-300 group-hover:w-full"></span>

                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer