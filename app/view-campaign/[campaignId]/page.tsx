/*export default function ViewCampaign({ params }: { params: { campaignId: string } }) {
    return <><h1>View Campaign: {params.campaignId}</h1></>;
}*/

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

type CampaignDetailsProps = {
  params: { campaignId: string };
};

// Function to calculate days left (hardcoded version)
const daysLeft = (deadline: string) => {
  const now = new Date();
  const endDate = new Date(deadline);
  const timeDiff = endDate.getTime() - now.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysRemaining > 0 ? daysRemaining : 0;
};

// Function to calculate percentage bar (hardcoded version)
const calculateBarPercentage = (target: string, collected: string) => {
  const targetNum = parseFloat(target.split(' ')[0]);
  const collectedNum = parseFloat(collected.split(' ')[0]);
  return (collectedNum / targetNum) * 100;
};

// Custom CountBox component (hardcoded version)
const CountBox = ({ title, value }: { title: string, value: string | number }) => (
  <div className="flex flex-col items-center p-4 bg-[#1c1c24] rounded-[10px]">
    <h4 className="font-epilogue font-semibold text-[14px] text-white">{title}</h4>
    <p className="font-epilogue font-bold text-[20px] text-white">{value}</p>
  </div>
);

// Hardcoded Loader component
const Loader = () => <div className="loader">Loading...</div>;

// Hardcoded CustomButton component
const CustomButton = ({ title, styles, handleClick }: { title: string, styles: string, handleClick: () => void }) => (
  <button type="button" className={styles} onClick={handleClick}>
    {title}
  </button>
);

const ViewCampaign: React.FC<CampaignDetailsProps> = () => {
  const { query } = useRouter();
  const { campaignId } = query;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const [donators, setDonators] = useState<{ donator: string; donation: string }[]>([]);

  const [campaignState, setCampaignState] = useState({
    image: '/path/to/image.jpg',
    deadline: '2024-12-31',
    target: '100 ETH',
    amountCollected: '20 ETH',
    pId: String(campaignId),
    owner: '0xOwnerAddress',
    description: 'This is a sample campaign description.',
  });

  const remainingDays = daysLeft(campaignState.deadline);

  const fetchDonators = async () => {
    // Simulating fetching donators
    setDonators([
      { donator: '0x123...', donation: '0.5 ETH' },
      { donator: '0x456...', donation: '1.0 ETH' },
    ]);
  };

  useEffect(() => {
    fetchDonators();
  }, []);

  const handleDonate = async () => {
    setIsLoading(true);
    // Simulating donation process
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <Image src={campaignState.image} alt="campaign" width={800} height={410} className="object-cover rounded-xl" />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(campaignState.target, campaignState.amountCollected)}%`, maxWidth: '100%' }}>
            </div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${campaignState.target}`} value={campaignState.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <Image src="/path/to/thirdweb.png" alt="user" width={52} height={52} className="object-contain" />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{campaignState.owner}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">10 Campaigns</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>
            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{campaignState.description}</p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Donators</h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? donators.map((item, index) => (
                <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                  <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">{index + 1}. {item.donator}</p>
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all">{item.donation}</p>
                </div>
              )) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No donators yet. Be the first one!</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Fund</h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Back it because you believe in it.</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Support the project for no reward, just because it speaks to you.</p>
              </div>

              <CustomButton
                //btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCampaign;
