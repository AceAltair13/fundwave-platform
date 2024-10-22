interface Campaign {
    owner: string;
    title: string;
    description: string;
    target: string;
    deadline: number;
    amountCollected: string;
    image: string;
}

const campaigns: Campaign[] = [
    {
        owner: '0x54357acf5d6af5fc9169bed0a1',
        title: 'Help me pay my tuition fees',
        description: 'I am a student in need of financial assistance to pay my tuition fees.',
        target: '0.50', // Corrected target
        deadline: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days from now
        amountCollected: '0.50', // Assuming they have reached their target
        image: 'https://picsum.photos/200',
    },
    {
        owner: '0x8ac5092b6f75cde9465e8b5c79',
        title: 'Help me pay my medical bills',
        description: 'I am in need of financial assistance to pay my medical bills.',
        target: '1.50', // Corrected target
        deadline: Date.now() + 1000 * 60 * 60 * 24 * 45, // 45 days from now
        amountCollected: '1.00', // Adjusted collected amount
        image: 'https://picsum.photos/200',
    },
    {
        owner: '0x9d7890fe92c48df54a8f8d9ca1',
        title: 'Support local animal shelter',
        description: 'We are raising funds to build better facilities for our rescued animals.',
        target: '2.00', // Target set for campaign
        deadline: Date.now() + 1000 * 60 * 60 * 24 * 60, // 60 days from now
        amountCollected: '0.75', // Amount raised so far
        image: 'https://picsum.photos/200',
    },
    {
        owner: '0xabc1032d4e65f65f05b0c8a1a2',
        title: 'Help me launch my startup',
        description: 'Raising capital to develop and launch a blockchain-based application.',
        target: '3.00', // Target for the startup
        deadline: Date.now() + 1000 * 60 * 60 * 24 * 90, // 90 days from now
        amountCollected: '1.50', // Amount raised so far
        image: 'https://picsum.photos/200',
    },
    {
        owner: '0x1245ad6b7e12f0f054ab9867d9',
        title: 'Help rebuild community center',
        description: 'Our community center was destroyed, and we need funds for rebuilding efforts.',
        target: '5.00', // Higher target for community project
        deadline: Date.now() + 1000 * 60 * 60 * 24 * 120, // 120 days from now
        amountCollected: '2.20', // Amount raised so far
        image: 'https://picsum.photos/200',
    }
];

export default campaigns;
export type { Campaign };
