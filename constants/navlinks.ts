import { Megaphone, LogOut, CircleDollarSign, User, SquarePen } from 'lucide-react'

interface NavLink {
    name: string
    link: string
    icon: React.ComponentType
    disabled?: boolean
}

const navlinks: NavLink[] = [
    { name: 'Campaigns', icon: Megaphone, link: '/' },
    { name: 'Create Campaign', icon: SquarePen, link: '/create-campaign' },
    { name: 'Payment', icon: CircleDollarSign, link: '/' },
    { name: 'Profile', icon: User, link: '/profile' },
    { name: 'Log Out', icon: LogOut, link: '/' },
]

export default navlinks