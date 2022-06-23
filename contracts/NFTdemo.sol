// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    
     constructor(
        
        string memory conName,
        string memory conSymb
       
    ) ERC721(conName, conSymb ) {
        
        
    }

       mapping(uint256 => string) private docHASHs;
       mapping(uint256 => string) private issuerIDs;
       mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;
   

    function safeMint(address to,  string memory docHASH  , string memory issuerID) public  {
         uint256 tokenId = _tokenIdCounter.current();
        mintdoc(to, tokenId,  issuerID,  docHASH );
        _tokenIdCounter.increment();
        
       
    }


      function mintdoc(address  to, uint256 tokenId, string memory issuerID , string memory docHASH ) private {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

       

        _balances[to] += 1;
        _owners[tokenId] = to;

          issuerIDs[tokenId] = issuerID;
         setdochash( docHASH , tokenId);
        emit Transfer(address(0), to, tokenId);

        
    }


    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }

    function setdochash(string memory docHASH , uint256 tokenId) public {

    

        docHASHs[tokenId] = docHASH;
    }

    function getIssuerID( uint256 tokenId) public view returns(string memory) {
          require(_owners[tokenId] != address(0), "ERC721: Invalid token ID");
        return issuerIDs[tokenId];
    }

    function getdoc( uint256 tokenId) public view returns(string memory) {
         require(_owners[tokenId] != address(0), "ERC721: Invalid token ID");
        return docHASHs[tokenId];
    }

    function Ownerof( uint256 tokenId) public view returns(address ) {
        require(_owners[tokenId] != address(0), "ERC721: Invalid token ID");
        return _owners[tokenId];
    }
    
    function gettokenID( address to) public view returns(uint256) {
        uint256 id;
        id = _balances[to]-1;
        return id;
    }
   
}
