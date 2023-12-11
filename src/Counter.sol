// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// import ERC2771
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";




contract Counter is ERC2771Context {
    uint256 public number;

    constructor(address trustedForwarder) ERC2771Context(trustedForwarder) {
        number = 0;
    }

    function increment() public {
        number++;
    }

    function setNumber(uint256 x) public {
        number = x;
    }
}

