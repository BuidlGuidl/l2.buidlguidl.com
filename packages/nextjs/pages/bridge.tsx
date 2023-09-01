import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import BridgeToBGChain from "~~/components/bgChain/BridgeToBGChain";

const Bridge: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Bridge Sepolia ETH to BG L2 Chain</span>
          </h1>
          <BridgeToBGChain />
        </div>
      </div>
    </>
  );
};

export default Bridge;
