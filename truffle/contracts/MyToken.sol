// SPDX-License-Identifier: MIT
pragma solidity >=0.6.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";  

contract Mytoken is ERC20 ,ERC20Detailed {
    constructor(uint256 initialsupply) ERC20Detailed("Duck-Token",  "DTK", 0) public {
      _mint (msg.sender, initialsupply);
    } 
}