import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import AddBGChain from "~~/components/bgChain/AddBGChain";
import BridgeToBGChain from "~~/components/bgChain/BridgeToBGChain";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">BuidlGuidl L2</span>
          </h1>
          <p className="text-center text-lg">L2 Tesnet (powered by the OP stack) for the BuidlGuidl.</p>
          <AddBGChain />
          <BridgeToBGChain />
        </div>
      </div>
    </>
  );
};

export default Home;
