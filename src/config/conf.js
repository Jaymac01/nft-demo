import contract from '../build/contracts/NFT.json';

const deployedNetwork = contract.networks["80001"];

export const address = deployedNetwork.address;
export const abi = contract.abi;
