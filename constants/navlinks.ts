import { Megaphone, PieChart, LogOut, CircleDollarSign, User } from 'lucide-react'

interface NavLink {
    name: string
    link: string
    icon: React.ComponentType
    disabled?: boolean
}

const navlinks: NavLink[] = [
    { name: 'Campaigns', icon: Megaphone, link: '/' },
    { name: 'Campaign', icon: PieChart, link: '/' },
    { name: 'Payment', icon: CircleDollarSign, link: '/' },
    { name: 'Account', icon: User, link: '/' },
    { name: 'Log Out', icon: LogOut, link: '/' },
]

export default navlinks