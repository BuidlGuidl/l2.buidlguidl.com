import { useState } from "react";
import { Address, Balance, InputBase, getParsedError } from "../scaffold-eth";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { parseEther } from "viem";
import { sepolia, useAccount, useNetwork, useSwitchNetwork, useWalletClient } from "wagmi";
import { ArrowsRightLeftIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import { useNetworkColor, useTransactor } from "~~/hooks/scaffold-eth";
import { bgChainL2 } from "~~/scaffold.config";
import { notification } from "~~/utils/scaffold-eth";

const BRIDGE_CONTRACT_ADDRESS = "0x729593813494173Ce5d57743692c1E022425765f";

const BridgeToBGChain = () => {
  const [loading, setLoading] = useState(false);
  const [sendValue, setSendValue] = useState("");
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { chain: connectedChain } = useNetwork();
  const sepoliaColor = useNetworkColor(sepolia);
  const { switchNetwork } = useSwitchNetwork();
  const { openConnectModal } = useConnectModal();

  const bridgeTxn = useTransactor(walletClient);

  const sendETH = async () => {
    if (!connectedAddress) {
      return;
    }
    try {
      setLoading(true);
      await bridgeTxn({
        to: BRIDGE_CONTRACT_ADDRESS,
        value: parseEther(sendValue as `${number}`),
        account: connectedAddress,
        chain: sepolia,
      });
      setLoading(false);
      setSendValue("");
    } catch (error) {
      const parsedError = getParsedError(error);
      console.error("⚡️ ~ file: BridgeToBGChain.tsx:sendETH ~ error", error);
      notification.error(parsedError);
      setLoading(false);
    }
  };
  return (
    <div className="bg-base-300 p-6 rounded-xl space-y-4">
      <h3 className="text-xl font-bold mb-3 text-center">Bridge Sepolia ETH to BG L2 Chain</h3>
      <div className="space-y-3">
        <div className="flex flex-col items-center space-y-5">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm font-bold text-center">Bridge Contract Address</span>
            <Address address={BRIDGE_CONTRACT_ADDRESS} chain={sepolia} />
          </div>
          <div className="flex space-x-4">
            <div>
              <span className="text-sm font-bold pl-3">Your SEP ETH Balance:</span>
              <Balance address={connectedAddress} chain={sepolia} />
            </div>
            <div>
              <span className="text-sm font-bold pl-3">Your BG Chain ETH Balance:</span>
              <Balance address={connectedAddress} chain={bgChainL2} />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <InputBase placeholder="Amount to bridge" value={sendValue} onChange={value => setSendValue(value)} />
          {isConnected && connectedChain && connectedChain.id === sepolia.id ? (
            <button className="h-10 btn btn-secondary btn-sm px-2 rounded-full" onClick={sendETH} disabled={loading}>
              {!loading ? (
                <BanknotesIcon className="h-6 w-6" />
              ) : (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              <span>Send</span>
            </button>
          ) : connectedChain ? (
            <button
              className="h-10 btn btn-secondary btn-sm px-2 rounded-full"
              type="button"
              onClick={() => switchNetwork?.(sepolia.id)}
            >
              <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <span className="whitespace-nowrap">
                Switch to <span style={{ color: sepoliaColor }}>{sepolia.name}</span>
              </span>
            </button>
          ) : (
            <button
              onClick={openConnectModal}
              disabled={isConnecting}
              className="h-10 btn btn-secondary btn-sm px-2 rounded-full"
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

export default BridgeToBGChain;
