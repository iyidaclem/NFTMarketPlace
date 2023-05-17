// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./BNUGToken.sol";

import "hardhat/console.sol";

contract NFTMarketplaceV2 is ERC721URIStorageUpgradeable, OwnableUpgradeable {
        using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;
    CountersUpgradeable.Counter private _itemsSold;
    BNUGToken private bNUGToken;
    uint256 listingPrice;
    uint256 private mintingReward;
    bool private isMintingRewardPaused;
    uint256 userCount;
    bool private infiniteReward;
    uint256 referReward;

    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(address => User) private users;
    mapping(uint256 => User) private _users;
    mapping(address => Reward[]) private rewards;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    struct User {
        uint256 userId;
        address userAddress;
        string avatar;
        uint256 nftCount;
        address referedBy;
    }

    struct Reward {
        address from;
        uint256 amount;
        string rewardType;
    }

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    function initialize (address bnung_token) public initializer {
        bNUGToken = BNUGToken(bnung_token);
        listingPrice = 0.025 ether;
        mintingReward = 10 ether;
        isMintingRewardPaused = false;
        infiniteReward = false;
        referReward = 5 ether;
        __ERC721_init("Negritude", "NEG");
        __Ownable_init();
    }

    function updateBNUGTokenAddress(address bnug_token) public onlyOwner {
        require(bnug_token != address(0), "Zero address not allowed");
        bNUGToken = BNUGToken(bnug_token);
    }

    /* update token contract address */

    /* Updates the listing price of the contract */
    function updateListingPrice(uint _listingPrice) public payable onlyOwner {
        listingPrice = _listingPrice;
    }

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    /* Mints a token and lists it in the marketplace */
    function createToken(
        string memory tokenURI,
        uint256 price,
        address referer
    ) public payable returns (uint) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        if (!isMintingRewardPaused) {
            bNUGToken.mintCommunityToken(msg.sender, mintingReward);
            rewardUser(msg.sender, mintingReward, "minting_reward");
        }
        connectUser(referer);
        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        _transfer(msg.sender, address(this), tokenId);
        // payable(owner()).transfer(listingPrice);
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    /* allows someone to resell a token they have purchased */
    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        _itemsSold.decrement();
        _transfer(msg.sender, address(this), tokenId);
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(uint256 tokenId) public payable {
        uint price = idToMarketItem[tokenId].price;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        address seller_ = idToMarketItem[tokenId].seller;
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].seller = payable(address(0));
        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);
        payable(seller_).transfer(msg.value);
    }

    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _tokenIds.current();
        uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this)) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // return minting reward
    function getMintingReward() public view returns (uint256 reward) {
        return mintingReward;
    }

    // update minting reward
    function setMintingReward(uint256 newMintingReward) public onlyOwner {
        require(
            newMintingReward > 0,
            "Minting reward must be greater than zero"
        );
        mintingReward = newMintingReward;
    }

    // pause minting reward
    function pauseMintingReward() public onlyOwner {
        isMintingRewardPaused = true;
    }

    // resume minting reward
    function resumeMintingReward() public onlyOwner {
        isMintingRewardPaused = false;
    }

    // connect User wallet
    function connectUser(address referer) public {
        if (users[msg.sender].userId == 0) {
            users[msg.sender] = User(++userCount, msg.sender, "", 1, referer);
            _users[userCount] = User(userCount, msg.sender, "", 1, referer);
            if (referer != address(0)) {
                bNUGToken.mintCommunityToken(referer, referReward);
                rewardUser(referer, referReward, "referer_minter_reward");
            }
        } else {
            users[msg.sender].nftCount++;
            _users[users[msg.sender].userId].nftCount++;

            if (infiniteReward && users[msg.sender].referedBy != address(0)) {
                bNUGToken.mintCommunityToken(users[msg.sender].referedBy, referReward);
                rewardUser(users[msg.sender].referedBy, referReward, "referer_minter_reward");
            }
        }
    }

    function getUser(
        address user
    ) public view returns (User memory, Reward[] memory) {
        return (users[user], rewards[user]);
    }

    function getAllUser() public view returns (User[] memory) {
        User[] memory allUsers = new User[](userCount);
        for (uint256 i = 0; i < userCount; i++) {
            allUsers[i] = _users[i + 1];
        }
        return allUsers;
    }

    // update avatar url
    function updateAvatar(string memory avatarUrl) public {
        users[msg.sender].avatar = avatarUrl;
    }

    //REWARD OF MINTERS
    //update minter reward
    function updateInfiniteReward() public onlyOwner {
        infiniteReward = !infiniteReward;
    }

    function updateReferReward(uint256 newReward) public onlyOwner {
        referReward = newReward;
    }

    function rewardUser(
        address user,
        uint256 amount,
        string memory rewardType
    ) private {
        rewards[user].push(Reward(msg.sender, amount, rewardType));
    }

    function fetchRewards() public view returns (Reward[] memory) {
        return rewards[msg.sender];
    }

    function sendBalance(uint256 amount_, address receiver_) public onlyOwner() {
        require(address(this).balance >= amount_, "Insufficient balance");
        payable(receiver_).transfer(amount_);
    }
}
