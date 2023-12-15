
pragma solidity ^0.8.0;

// import multicall
// 

import "@openzeppelin1/contracts/metatx/ERC2771Context.sol";

import "@openzeppelin1/contracts/metatx/ERC2771Forwarder.sol";

import "@openzeppelin1/contracts/utils/Context.sol";

import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";


import "@openzeppelin1/contracts/token/ERC20/ERC20.sol";


import "@openzeppelin1/contracts/utils/Multicall.sol";


contract MyContract is ERC20,ERC2771Context, Multicall {

// inintal the contract owner 

uint256 public amount1;
address public owner;
event Mint(address indexed to, uint256 amount);
 constructor(address trustedForwarder) ERC20("MyToken", "MTK") ERC2771Context(trustedForwarder) {
    owner=msg.sender;
    amount1=1000000000000000000000;
    _mint(address(0x70997970C51812dc3A010C7d01b50e0d17dc79C8), amount1);

 }

    function mint(address to, uint256 amount) public returns (uint256)  {
        require(msg.sender == owner, "only owner");
        _mint(to, amount);      
        return amount;
    }


   function _msgSender() internal view virtual  override(Context,ERC2771Context) returns (address) {
       return ERC2771Context._msgSender();
   }

   function _msgData() internal view virtual override(Context,ERC2771Context) returns (bytes calldata) {
       return ERC2771Context._msgData();
   }


   function burn(uint256 amount) public {
       _burn(_msgSender(), amount);
   }

}