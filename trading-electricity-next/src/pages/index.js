import web3 from "blockend/web3";
import { useEffect, useState } from "react";
import { AuctionContract } from "blockend/interact";
import Link from "next/link";

import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";

export default function Home() {
  web3.eth.getAccounts().then(console.log);

  const [account, setAccount] = useState("");

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    getAccount();
  }, []);

  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchData() {
      const accounts = await web3.eth.requestAccounts();
      const result = await AuctionContract.methods.getAllListings().call();
      setData(result);
    }
    fetchData();
  }, []);

  const [listingAddress, setListingAddress] = useState("");

  // useEffect(() => {
  //   const getListingAddress = async () => {
  //     if (AuctionContract) {
  //       const listing = await AuctionContract.methods.getAllListings(listingId).call();
  //       setListingAddress(listing.address);
  //     }
  //   };

  //   getListingAddress();
  // }, [AuctionContract]);

  const handleSubmit = async (_listingId, _units) => {
    //get the account address to make the transaction
    const accounts = await web3.eth.requestAccounts();

    const tx = await AuctionContract.methods
      .placeBid(_listingId, _units)
      .send({ from: accounts[0] });
  };

  return (
    <div>
      <div>
        <h1 style={{ color: "white", fontFamily: "Arial" }}>
          Welcome to P2P Electricity Transfer Network
        </h1>
        {/* <button className='btn'>Connect Wallet</button> */}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ color: "white", marginTop: "70px" }}>Hello {account}! </h3>
        <Link
          href="/MyPortal"
          style={{
            color: "#00ffef",
            marginTop: "70px",
            fontSize: "20px",
            fontWeight: "Bold",
            textDecoration: "underline",
          }}
        >
          Go to MyPortal{" "}
        </Link>
      </div>
      <h2 className="portal-style">Available Electricity Units for Sale</h2>

      <table className="table-1">
        <tbody>
          <tr>
            <th>Seller Address</th>
            <th>Units Available</th>
            <th>Price</th>
            <th>Buy</th>
          </tr>

          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.prosumer}</td>
                <td>{item.units}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    onSubmit={handleSubmit(item.listingId, item.units)}
                    style={{
                      backgroundColor: "#9cecdb",
                      width: "12vh",
                      height: "30px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    buy
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* <MyFooter/> */}

      <hr style={{ marginTop: "50px", borderTop: "1px solid" }}></hr>

      <div style={{ marginTop: "20px" }}>
        <Link
          target="_blank"
          href="https://github.com/quaintrelle7/P2P-Electricity-Transfer"
        >
          <AiFillGithub color="white" fontSize={"25px"} />
          <text
            style={{
              color: "white",
              marginLeft: "90px",
              marginTop: "3px",
              position: "absolute",
            }}
          >
            Github Repo
          </text>
        </Link>

        <Link href="https://twitter.com/ARPITKU80579385" target="_blank">
          <AiFillTwitterCircle
            color="white"
            fontSize={"25px"}
            style={{ marginLeft: "20px" }}
          />
          <text
            style={{
              color: "white",
              marginLeft: "5px",
              marginTop: "3px",
              position: "absolute",
            }}
          >
            @dungexn
          </text>
        </Link>
        <Link target="_blank" href="https://twitter.com/qua_intrelle7">
          <text
            style={{
              color: "white",
              marginLeft: "90px",
              marginTop: "3px",
              position: "absolute",
            }}
          >
            @qua_intrelle7
          </text>
        </Link>
      </div>
    </div>
  );
}
