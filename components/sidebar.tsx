'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import FundwaveImage from '@/assets/fundwave.png'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import navlinks from '@/constants/navlinks'
import { Sun } from 'lucide-react'



export default function Sidebar() {
    const router = useRouter()
    const { theme, setTheme } = useTheme()
    const [isActive, setIsActive] = useState('dashboard')
    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

    return (
        <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
            <Link href="/">
                <Button variant={theme == 'light' ? "default" : "secondary"} size="icon" className="w-[52px] h-[52px]">
                    <Image src={FundwaveImage} alt="Fundwave Logo" />
                </Button>
            </Link>

            <div className="flex-1 flex flex-col justify-between items-center rounded-[20px] w-[76px] py-4 mt-12">
                <div className="flex flex-col justify-center items-center gap-3">
                    {navlinks.map((link) => (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        key={link.name}
                                        variant={isActive === link.name ? "secondary" : "ghost"}
                                        size="icon"
                                        className="w-[48px] h-[48px]"
                                        disabled={link.disabled}
                                        onClick={() => {
                                            if (!link.disabled) {
                                                setIsActive(link.name)
                                                router.push(link.link)
                                            }
                                        }}
                                    >
                                        <link.icon />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side='right' avoidCollisions>{link.name}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                </div>

                <Button variant="outline" size="icon" className="w-[48px] h-[48px]" onClick={toggleTheme}>
                    <Sun className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}