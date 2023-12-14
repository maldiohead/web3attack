// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Counter.sol";

contract CounterTest is Test {
    MyContract public counter;

    function setUp() public {
        counter = new MyContract(address(this));
        
        
    }


    function testCounter() public {
        //.counter.doSomething();

    }

// implement call multicall function in the Counter.sol
    function test_Multicall() public {
        // counter.incremen
//
//        //bytes[] calldata data
//    
//    //counter.multicall(data);
//
//
//// Assuming `multicall` function expects an array of bytes
//bytes[] memory calls = new bytes[](2);
//calls[0] = abi.encodeWithSignature("burn(uint256)", 0x11);
//
//counter.multicall(calls);
//

     ///counter.multicall({"burn",0x11});


    }


}
