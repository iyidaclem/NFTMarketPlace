// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract BNUGEvent is
    Initializable,
    ERC1155Upgradeable,
    OwnableUpgradeable,
    PausableUpgradeable,
    ERC1155SupplyUpgradeable
{
    uint256 public constant GENERAL = 0;
    uint256 public constant VIP = 1;
    uint256 public constant DEVS = 2;
    uint256 public general_fee;
    uint256 public vip_fee;
    uint256 public devs_fee;
    string public name;
    string public symbol;
    string private _uri;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(string calldata uri_) public initializer {
        __ERC1155_init(uri_);
        __Ownable_init();
        __Pausable_init();
        __ERC1155Supply_init();
        general_fee = 2 ether;
        vip_fee = 50 ether;
        devs_fee = 30 ether;
        name = "BNUGDAO EVENT";
        symbol = "BNUGDAO";
        _uri = uri_;
    }

    function setURI(string memory newuri) public onlyOwner {
        _uri = newuri;
        _setURI(newuri);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return
            string(
                abi.encodePacked(_uri, "/", Strings.toString(tokenId), ".json")
            );
    }

    function setMintingFee(uint8 id, uint256 new_fee) public onlyOwner {
        require(id >= 0 && id <= 2, "Invalid id");

        if (id == 0) {
            general_fee = new_fee;
        } else if (id == 1) {
            vip_fee = new_fee;
        } else {
            devs_fee = new_fee;
        }
    }

    function getFee(uint8 id) public view returns (uint256) {
        require(id >= 0 && id <= 2, "Invalid id");

        if (id == 0) {
            return general_fee;
        } else if (id == 1) {
            return vip_fee;
        } else {
            return devs_fee;
        }
    }

    function distributeFee(
        address payable _recipient,
        uint256 _amount
    ) public onlyOwner {
        require(address(this).balance >= _amount, "Insufficient balance");
        _recipient.transfer(_amount);
    }

    function getbalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(uint8 id, uint256 amount) public payable {
        if (id == 0) {
            require(
                msg.value == getFee(id) * amount,
                "Error: Minting fee required"
            );
        }
        _mint(msg.sender, id, amount, "");
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    )
        internal
        override(ERC1155Upgradeable, ERC1155SupplyUpgradeable)
        whenNotPaused
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
