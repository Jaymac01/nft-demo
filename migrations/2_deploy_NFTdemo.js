const NFT= artifacts.require('NFT');

module.exports = function (deployer) {
  deployer.deploy(NFT,"nft_demo","VAL");
};
