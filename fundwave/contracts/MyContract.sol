// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MyContract {
    // Structure to represent a crowdfunding campaign
    struct CrowdFundingCampaign {
        address owner;
        string title;
        string description;
        uint256 targetAmount;
        uint256 deadline;
        uint256 amountCollected;
        string imageUrl;
        address[] donators;
        uint256[] donations;
    }

    // Mapping to store all crowdfunding campaigns with a unique ID
    mapping(uint256 => CrowdFundingCampaign) public campaigns;

    // Counter to keep track of the number of campaigns
    uint256 public campaignCount = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _targetAmount,
        uint256 _deadline,
        string memory _imageUrl
    ) public returns (uint256) {
        CrowdFundingCampaign storage newCampaign = campaigns[campaignCount];

        // Ensuring the deadline is in the future
        require(
            newCampaign.deadline < block.timestamp,
            "The deadline should be a date in the future."
        );

        // Initializing the new campaign with provided details
        newCampaign.owner = _owner;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.targetAmount = _targetAmount;
        newCampaign.deadline = _deadline;
        newCampaign.amountCollected = 0;
        newCampaign.imageUrl = _imageUrl;

        campaignCount++;

        return campaignCount - 1;
    }

    function donateCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        CrowdFundingCampaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns()
        public
        view
        returns (CrowdFundingCampaign[] memory)
    {
        CrowdFundingCampaign[] memory allCampaigns = new CrowdFundingCampaign[](
            campaignCount
        );

        for (uint i = 0; i < campaignCount; i++) {
            CrowdFundingCampaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
}
