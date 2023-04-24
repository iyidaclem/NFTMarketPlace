// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract BNUGToken is Initializable, ERC20Upgradeable, OwnableUpgradeable {
    /**
     * @notice _isAdmin is a status to check if
     * a given wallet address is admin or not
     * Admins can be a contract or normal wallet address
     * Admin contract will be able to issue mint token
     * or burn token.
     * admin contract will be use mostly to distribute
     * token to the community e.g. through airdrop
     *
     */
    mapping(address => bool) public _isAdmin;
    address[] private admins;
    uint256 _maxSupply;

    modifier _onlyAdmin() {
        require(_isAdmin[msg.sender], "Only admin can call this");
        _;
    }

    function initialize() public initializer {
        _mint(msg.sender, 1000000 ether);
        admins.push(msg.sender);
        _isAdmin[msg.sender] = true;
        _maxSupply = 10000000 ether;
        __ERC20_init_unchained("BNUGDAO", "BNUG");
        __Ownable_init_unchained();
    }

    /**
     * @dev Returns the max supply.
     */
    function maxSupply() public view returns (uint256) {
        return _maxSupply;
    }

    /**
     * @param new_admin -New admin to be created
     * Description - Function to create new admin.
     */
    function setAdmin(address new_admin) public onlyOwner {
        _isAdmin[new_admin] = true;
        bool adminExist = false;
        for (uint256 i = 0; i < admins.length; i++) {
            if (admins[i] == new_admin) {
                adminExist = true;
                break;
            }
        }
        if (!adminExist) {
            admins.push(new_admin);
        }
    }

    function getAdmins() public view _onlyAdmin returns (address[] memory) {
        return admins;
    }

    function getAdmin(uint256 index) public view _onlyAdmin returns (address) {
        if (index < admins.length) {
            return admins[index];
        }
        return address(0);
    }

    /**
     * removeAdmin - function to remove address from being admin
     * @param admin - address to remove
     */
    function removeAdmin(address admin) public onlyOwner {
        _isAdmin[admin] = false;
    }

    /**
     * renounceAdminship - remove self from being admin
     */
    function renounceAdminship() public _onlyAdmin {
        _isAdmin[msg.sender] = false;
    }

    /**
     * isAdmin - check if a user is an admin
     */
    function isAdmin(address user) public view returns (bool) {
        return _isAdmin[user];
    }

    /**
     *
     * @param account - reciever of the minted tokens
     * @param amount  - amount of tokens to be minted
     */
    function mintCommunityToken(
        address account,
        uint256 amount
    ) public _onlyAdmin {
        require(
            (totalSupply() + amount) <= _maxSupply,
            "Total supply cannot exceeed maximum supply"
        );
        _mint(account, amount);
    }

    /**
     *
     * @param account - the account where token will be burnt
     * @param amount  - amount of token to burn
     */

    function burnToken(address account, uint256 amount) public _onlyAdmin {
        _burn(account, amount);
    }
}
