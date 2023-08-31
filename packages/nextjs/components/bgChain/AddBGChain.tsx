import { useState } from "react";
import { getParsedError } from "../scaffold-eth";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useAccount, useWalletClient } from "wagmi";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { bgChainL2 } from "~~/scaffold.config";
import { notification } from "~~/utils/scaffold-eth";

const AddBGChain = () => {
  const [loading, setLoading] = useState(false);
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { openConnectModal } = useConnectModal();

  const addBGChain = async () => {
    if (!connectedAddress) {
      return;
    }

    try {
      setLoading(true);
      walletClient?.addChain({ chain: bgChainL2 });
      setLoading(false);
    } catch (error) {
      const parsedError = getParsedError(error);
      notification.error(parsedError);
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-300 p-6 rounded-xl space-y-4 m-6">
      <h3 className="text-xl font-bold mb-3 text-center">BG L2 Chain</h3>
      <div className="space-y-3">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col space-y-3 w-5/12">
            <div className="pl-4">Chain ID</div>
            <div className="flex justify-between bg-base-200 rounded-full px-4 py-2">
              <div>{bgChainL2.id}</div>
              <CopyToClipboard text={bgChainL2.id.toString()}>
                <DocumentDuplicateIcon
                  className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
                  aria-hidden="true"
                />
              </CopyToClipboard>
            </div>
          </div>
          <div className="flex flex-col space-y-3 w-5/12">
            <div className="pl-4">Token</div>
            <div className="flex justify-between bg-base-200 rounded-full px-4 py-2">
              <div>{bgChainL2.nativeCurrency.name}</div>
              <CopyToClipboard text={bgChainL2.nativeCurrency.name}>
                <DocumentDuplicateIcon
                  className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
                  aria-hidden="true"
                />
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="pl-4">Block Explorer</div>
          <div className="flex justify-between bg-base-200 rounded-full px-4 py-2">
            <div>{bgChainL2.blockExplorers.default.url}</div>
            <CopyToClipboard text={bgChainL2.blockExplorers.default.url}>
              <DocumentDuplicateIcon
                className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
            </CopyToClipboard>
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="pl-4">RPC URL</div>
          <div className="flex justify-between bg-base-200 rounded-full px-4 py-2">
            <div>{bgChainL2.rpcUrls.public.http}</div>
            <CopyToClipboard text={bgChainL2.rpcUrls.public.http.toString()}>
              <DocumentDuplicateIcon
                className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
            </CopyToClipboard>
          </div>
        </div>
        <div className="flex flex-col space-y-3 pt-4">
          {isConnected ? (
            <button className="h-10 btn btn-accent btn-sm px-2 rounded-full" onClick={addBGChain} disabled={loading}>
              <span>+ Add to Wallet</span>
            </button>
          ) : (
            <button
              onClick={openConnectModal}
              disabled={isConnecting}
              className="h-10 btn btn-accent btn-sm px-2 rounded-full"
            >
              {isConnecting && <span className="loading loading-spinner loading-sm"></span>}
              <span>Connect Wallet</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBGChain;
