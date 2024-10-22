'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Search, Menu, User } from 'lucide-react'
import navlinks from '@/constants/navlinks'
import { ConnectButton } from 'thirdweb/react'
import { client } from '@/lib/smartcontract'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import fundwave from "@/assets/fundwave.png"
import Link from 'next/link'

export default function Navbar() {
    const { theme } = useTheme()
    const router = useRouter()
    const [isActive, setIsActive] = useState('dashboard')

    return (
        <>
            <div className="flex md:flex-row flex-col-reverse justify-between mb-6 gap-6">
                <Link href="/">
                    <div className="lg:flex-1 flex flex-row items-center max-w-[458px] h-[52px] bg-card rounded-full -ml-4">
                        <Image src={fundwave} alt="Fundwave Logo" height={64} width={64} />
                        <h1 className='text-3xl font-bold'>Fund<span className='text-lime-400'>Wave</span></h1>
                    </div>
                </Link>

                {/* Large screen navigation */}
                <div className="sm:flex hidden flex-row justify-end gap-4">
                    <ConnectButton client={client} theme={theme == "dark" ? "dark" : "light"} />
                </div>

                {/* Small screen navigation */}
                <div className="sm:hidden flex justify-between items-center relative">
                    <Button variant="outline" size="icon" className="w-[40px] h-[40px] rounded-[10px]">
                        <Home className="h-6 w-6" />
                    </Button>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <nav className="flex flex-col gap-4">
                                {navlinks.map((link) => (
                                    <Button
                                        key={link.name}
                                        variant={isActive === link.name ? "default" : "ghost"}
                                        className="justify-start"
                                        onClick={() => {
                                            setIsActive(link.name)
                                            router.push(link.link)
                                        }}
                                    >
                                        <link.icon />
                                        <span className="ml-2">{link.name}</span>
                                    </Button>
                                ))}
                            </nav>
                            <div className="mt-4">
                                <ConnectButton client={client} theme={theme == "dark" ? "dark" : "light"} />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <hr className='mb-8' />
        </>
    )
}