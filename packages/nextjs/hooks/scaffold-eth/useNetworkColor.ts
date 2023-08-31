import { useDarkMode } from "usehooks-ts";
import { Chain } from "wagmi";
import { NETWORKS_EXTRA_DATA, getTargetNetwork } from "~~/utils/scaffold-eth";

const DEFAULT_NETWORK_COLOR: [string, string] = ["#666666", "#bbbbbb"];

/**
 * Gets the color of the target network
 */
export const useNetworkColor = (chain?: Chain) => {
  const { isDarkMode } = useDarkMode();
  const colorConfig =
    chain && NETWORKS_EXTRA_DATA[chain.id]?.color
      ? NETWORKS_EXTRA_DATA[chain.id].color
      : getTargetNetwork().color ?? DEFAULT_NETWORK_COLOR;

  return Array.isArray(colorConfig) ? (isDarkMode ? colorConfig[1] : colorConfig[0]) : colorConfig;
};
