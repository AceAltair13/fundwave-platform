'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Search, Menu, User } from 'lucide-react'
import navlinks from '@/constants/navlinks'

export default function Navbar() {
    const router = useRouter()
    const [isActive, setIsActive] = useState('dashboard')
    const [address, setAddress] = useState('')

    const connect = () => {
        // Dummy connect function
        setAddress('0x1234...5678')
    }

    return (
        <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
            <div className="lg:flex-1 flex flex-row max-w-[458px] h-[52px] bg-card rounded-full">
                <Input
                    type="text"
                    placeholder="Search for campaigns"
                    className="flex w-full mr-3"
                />
                <Button size="icon">
                    <Search className='h-6 w-6' />
                </Button>
            </div>

            <div className="sm:flex hidden flex-row justify-end gap-4">
                <Button
                    variant={address ? "default" : "outline"}
                    onClick={() => {
                        if (address) router.push('/create-campaign')
                        else connect()
                    }}
                >
                    {address ? 'Create a campaign' : 'Connect'}
                </Button>

                <Link href="/profile">
                    <Button variant="secondary" size="icon">
                        <User className="h-6 w-6" />
                    </Button>
                </Link>
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
                            <Button
                                className="w-full"
                                variant={address ? "default" : "outline"}
                                onClick={() => {
                                    if (address) router.push('/create-campaign')
                                    else connect()
                                }}
                            >
                                {address ? 'Create a campaign' : 'Connect'}
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}