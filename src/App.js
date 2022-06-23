import { ethers, Signer } from "ethers";
import { address, abi } from "./config/conf";
import { useState, useEffect } from "react";
// import axios from "axios";


const App = () => {
  const [tokenMinted, setTokenMinted] = useState(false);
  let [blocktxn, setblockTxn] = useState(null);
  // let [fileUrl, setFileUrl] = useState();
  // let [ID, setID] = useState(0);
  // let [jsonCid, setJsonCid] = useState(null);
  let [currentAccount, setCurrentAccount] = useState(null);
  let [issuer, setIssuer] = useState(null);
  let [hash, sethash] = useState(null);
  let [ownerid, setOwnerID] = useState(null);
  let ID;
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  // console.log(signer,"signer method")
  // const mnemonic = "crater cheap garden weasel bachelor orient situate wait model notable mixed poem";
  // const private_key = "a18379437a7d05b763560fde85ab5f4b934bf857d9cd373da138d851720a4ccd";
  const nftContract = new ethers.Contract(address, abi, signer);
  const to = "0xe2A4C1c196C9bEE3aC716f4243f616e922F7D60d";
  // const pinataApiKey = "4d37623cdbbfb91c7f0d";
  // const pinataSecretApiKey =
  //   "5043ec80f9de04cb311185b7026c84769225d2896e3a45e097a1c020d2f07251";
  // const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  // const jsonUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

  const connectWalletHandler = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please install Metamask!");
    }
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found an account! Address: ", accounts[0]);
      window.ethereum.on("accountsChanged", function (accounts) {
        window.location.reload();
      });
      setCurrentAccount(accounts[0]);
      return accounts[0];
    } catch (err) {
      console.log(err);
    }
  };

  const connectWallet = () => {
    return (
      <div>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
          rel="stylesheet"
        ></link>
        <button
          onClick={connectWalletHandler}
          className="py-2 px-4 bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
        >
          {currentAccount ? currentAccount : "Connect Wallet"}
        </button>
        <p>Connect your wallet first</p>
      </div>
    );
  };

  const minttokenHandler = async (address, dochash, issuehash) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        let txn = await nftContract.safeMint(address, dochash, issuehash);
        await txn.wait();
        console.log(txn,"txn summary");
        
        setTokenMinted(true);
        setblockTxn(txn.hash);
      ID = tokenIDHandler(to);
       console.log(ID,"token-Id21")
        ownHandler(ID);
        dochandler(ID);
        ownerOf(ID);
       
        return txn;
        
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const tokenIDHandler = async (to) => {
    let tokenId = await nftContract.gettokenID(to);
    console.log(tokenId,"token-ID");
    return tokenId;
 
  }; 
  const ownHandler = async (tokenId) => {
    let owner = await nftContract.getIssuerID(tokenId);
    setIssuer(owner);
    console.log(owner);
  };

  const dochandler = async (tokenId) => {
    let doc = await nftContract.getdoc(tokenId);
    sethash(doc);
    console.log(doc);
  };

  const ownerOf = async (tokenId) => {
    let id = await nftContract.Ownerof(tokenId);
    setOwnerID(id);
    console.log(id);
  };

  // const fileHandler = async (e) => {
  //   const file = e.target.files[0];
  //   console.log(file, "img-url");
  //   let data = new FormData();
  //   console.log(data, "img-url-readable");
  //   data.append("file", file);
  //   try {
  //     axios
  //       .post(url, data, {
  //         headers: {
  //           maxBodyLength: "Infinity",
  //           pinata_api_key: pinataApiKey,
  //           pinata_secret_api_key: pinataSecretApiKey,
  //         },
  //       })
  //       .then((response) => {
  //         console.log("image uploaded");
  //         let imageUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  //         setFileUrl(imageUrl);
  //       });
  //   } catch (error) {
  //     console.log("Error uploading file: ", error);
  //   }
  // };

  // const jsonHandler = (data) => {
  //   console.log(data, "form-data");
  //   const jsonData = JSON.stringify(data);
  //   try {
  //     axios
  //       .post(jsonUrl, jsonData, {
  //         headers: {
  //           pinata_api_key: pinataApiKey,
  //           pinata_secret_api_key: pinataSecretApiKey,
  //         },
  //       })
  //       .then(async (response) => {
  //         setJsonCid(response.data.IpfsHash);
  //         console.log(response.data.IpfsHash, "ipfshash");
  //         setJsonCid(response.data.IpfsHash);
  //         let txn = await minttokenHandler(
  //           data.tokenIssued,
  //           `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
  //           data.tokenIssuerID
  //         );
  //         setTokenMinted(true);
  //         setblockTxn(txn.hash);
  //         console.log(txn);
  //         ownHandler(ID);
  //         dochandler(ID);
  //         ownerOf(ID);
  //       });
  //   } catch (error) {
  //     console.log("Error uploading file: ", error);
  //   }
  // };

  // const uploadHandler = async (e) => {
  //   e.preventDefault();
  //   let data = {};
  //   let i = 0;
  //   data["itemName"] = e.target.name.value;
  //   data["url"] = fileUrl;
  //   data["TokenStandard"] = "ERC-721";
  //   data["BlockChain"] = "Polygon";
  //   data["tokenCreator"] = currentAccount;
  //   data["tokenIssued"] = e.target.wallet.value;
  //   data["tokenIssuerID"] = e.target.issueId.value;
  //   data["nft-ID"] = i;
  //   i=i+1;
  //   console.log(data, "data-upload");
  //   await jsonHandler(data);
  //   setID(i);
  // };


  const uploadHandler = async (e) => {
    e.preventDefault();
    console.log(to,e.target.dochash.value,e.target.issuehash.value,"upload-handler-data")
    minttokenHandler(to,e.target.dochash.value,e.target.issuehash.value)
  }



  const showhandler = () => (
    <div>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
        rel="stylesheet"
      ></link>

      <button className=" justify-content: flex-end; py-2 px-4 bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
        {currentAccount ? currentAccount : "Connect Wallet"}
      </button>

      <br />
      <br />
      <br />
      <br />
      <br />

      <h1 class="flex items-center justify-center p-12 text-gray-800 text-3xl font-semibold">NFT POC</h1>
      {/* <main className="flex-1 justify-space-evenly bg-gray-100 font-sans">
        <section>
          <label
            for="dropzone-file"
            className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
              Upload File
            </h2>

            <p className="mt-2 text-gray-500 tracking-wide">
              Upload or drag & drop your file SVG, PNG, JPG or GIF.{" "}
            </p>

            <input
              id="dropzone-file"
              onChange={fileHandler}
              type="file"
              class="hidden"
              accept="image/*"
            />
            <br />
            <br />
            {fileUrl && (
              <div>
                <img class=" rounded-lg flex-1 justify-center" src={fileUrl} />
              </div>
            )}
          </label>
        </section>
      </main> */}

     

      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={uploadHandler}>
            {/* <div className="mb-5">
              <label
               
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Wallet Address
              </label>
              <input
                type="text"
                name="wallet"
                placeholder="walletaddress"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div> */}
            <div className="mb-5">
              <label
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Document Hash
              </label>
              <input
                type="text"
                name="dochash"
                placeholder="Document Hash"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Issuer Hash
              </label>
              <input
                type="text"
                name="issuehash"
                placeholder="Issuer Hash"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div>
              <button
                type="submit"
                className="py-2 px-4 bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
              >
                Add your nft
              </button>
              
            </div>
          </form>
          
        </div>
      
      </div>
      { blocktxn && <div className="   flex items-center justify-evenly p-12 ">
              <a className="border-double border-4 border-indigo-600 " href={`https://mumbai.polygonscan.com/tx/${blocktxn}`} target="_blank"><u> Track your transaction</u></a>
              {/* <a className="border-double border-4 border-indigo-600 " href={`https://gateway.pinata.cloud/ipfs/${jsonCid}`} target="_blank" > Nft metadata on pinata IPFS  </a> */}
              </div>}
              <br/>
              <br/>
              
                
              { blocktxn && <div className="   flex items-center justify-evenly p-12 ">
              {ID && <div>
                  <p>Token ID : {ID}</p>
                </div>}
                {hash && <div>
                  <p>doc Hash : {hash}</p>
                </div>}
                {issuer && <div>
                  <p>Issuer Hash : {issuer}</p>
                </div>}
                {ownerid && <div>
               <p>nft issued address : {ownerid}</p>
                </div>}
                </div>}

                
              <br/>
              <br/> <br/>
              <br/> <br/>
              
    </div>
  );

  useEffect(() => {
    const loader = async () => {
      let account = connectWalletHandler();
      setCurrentAccount(account);
      connectWallet();
    };
  }, [currentAccount]);
  return <div>{currentAccount ? showhandler() : connectWallet()}</div>;
};

export default App;
