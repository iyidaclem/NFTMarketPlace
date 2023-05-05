// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract BNUGEvent is Initializable, ERC1155Upgradeable, OwnableUpgradeable, PausableUpgradeable, ERC1155SupplyUpgradeable {
    uint256 public constant GENERAL = 0;
    uint256 public constant VIP = 1;
    uint256 public constant DEVS = 2;
    uint256 public mintingFee = 0.03 ether;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() initializer public {
        __ERC1155_init("https://ipfs.io/ipfs/QmS97jahBSjQJiRFgbzafAUBEfkzAr41ff3thgeDir1oy4");
        __Ownable_init();
        __Pausable_init();
        __ERC1155Supply_init();
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function setMintingFee(uint256 new_fee) public onlyOwner {
        mintingFee = new_fee;
    }

    function distributeFee(address payable _recipient, uint256 _amount) public onlyOwner
    {
     require(address(this).balance >= _amount, "Insufficient balance");
    _recipient.transfer(_amount);   
    }

    function getbalance() public onlyOwner view returns(uint256)
    {
        return address(this).balance;
    }
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(uint256 id, uint256 amount)
        public
        payable 
    {
        require(msg.value == mintingFee, "Error: Minting fee required");
        _mint(msg.sender, id, amount, "");
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155Upgradeable, ERC1155SupplyUpgradeable)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
