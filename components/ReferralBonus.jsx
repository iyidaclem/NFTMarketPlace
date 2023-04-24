// import { ethers } from 'hardhat';
import React from 'react';

const ReferralTable = ({ data }) => (

  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <h1 className="text-center p-3 first-letter:font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">User Rewards</h1>
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className="px-6 py-3">SN</th>
          <th className="px-6 py-3">From</th>
          <th className="px-6 py-3">Rewards</th>
          <th className="px-6 py-3">Description</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((item, index) => (
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">

            <td className="px-6 py-4">{index + 1}</td>
            <td className="px-6 py-4">{item.from.substr(0, 4)}...{item.from.substr(item.from.length - 4)}</td>
            <td className="px-6 py-4">{item.amount} BNUG</td>
            <td className="px-6 py-4">NFT minting reward</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ReferralTable;
