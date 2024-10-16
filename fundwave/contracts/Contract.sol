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
    
    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _targetAmount, uint256 _deadline, string memory _imageUrl) public returns (uint256){
        CrowdFundingCampaign storage newCampaign = campaigns[campaignCount];

        // Ensuring the deadline is in the future
        require(newCampaign.deadline < block.timestamp, "The deadline should be a date in the future.");

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

    // function donateCampaign(){}

    // function getDonators(){}

    // function getCampaigns(){}
}