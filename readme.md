# ERC2771 & Multicall attack PoC

## Description

this is a reproduce of the attack Arbitrary Address Spoofing Attack by nolan@exvul(https://twitter.com/home)

reference: https://blog.openzeppelin.com/arbitrary-address-spoofing-vulnerability-erc2771context-multicall-public-disclosure


## Usage





- edit the MyContract, change the `_mint(address(0x70997970C51812dc3A010C7d01b50e0d17dc79C8), amount1);` first argument to victim address

```javascript
// src/Counter.sol

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

```
- build the contracts:
```bash
forge build
```

- run the anvil

- deploy the contracts

```bash
forge create src/Forward.sol:Forwarder --private-key=<PRIVATE_KEY>
forge create src/Counter.sol:MyContract --private-key=<PRIVATE_KEY>  --constructor-args <FORWARD_ADDRESS>   
```

- edit the contract , change the token address, Forward address, attack address ,victim address, and privatekey and then run the command:

```bash
node attack.js
```

## Contracts

- [`Counter.sol`](src/Counter.sol): A erc2771& multicall  contract.
- [`ECDSA.sol`](src/ECDSA.sol): Contract for ECDSA operations.
- [`EIP712.sol`](src/EIP712.sol): Implementation of EIP-712.
- [`Forward.sol`](src/Forward.sol): A contract for forwarding calls.

## Contributing

Contributions are welcome. Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
