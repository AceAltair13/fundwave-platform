import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { CircleDollarSign, Compass, SquarePen, User } from 'lucide-react'

interface NavLink {
    name: string
    link: string
    icon: React.ComponentType
    disabled?: boolean
}

const navlinks: NavLink[] = [
    { name: 'Explore Campaigns', icon: Compass, link: '/' },
    { name: 'Create Campaign', icon: SquarePen, link: '/create-campaign' },
    { name: 'Withdraw', icon: CircleDollarSign, link: '/' },
    { name: 'Profile', icon: User, link: '/profile' },
    { name: 'Project Link', icon: GitHubLogoIcon, link: 'https://github.com/AceAltair13/fundwave-platform' },
]

export default navlinks