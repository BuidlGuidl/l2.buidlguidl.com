import { useCallback, useEffect, useState } from "react";
import { Chain, useBalance } from "wagmi";
import { useGlobalState } from "~~/services/store/store";

export function useAccountBalance(address?: string, chain?: Chain) {
  const [isEthBalance, setIsEthBalance] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);
  const price = useGlobalState(state => state.nativeCurrencyPrice);

  const {
    data: fetchedBalanceData,
    isError,
    isLoading,
  } = useBalance({
    address,
    watch: true,
    // undefined meaning use fetch the balance of user connected chain
    chainId: chain ? chain.id : undefined,
  });

  const onToggleBalance = useCallback(() => {
    if (price > 0) {
      setIsEthBalance(!isEthBalance);
    }
  }, [isEthBalance, price]);

  useEffect(() => {
    if (fetchedBalanceData?.formatted) {
      setBalance(Number(fetchedBalanceData.formatted));
    }
  }, [fetchedBalanceData]);

  return { balance, price, isError, isLoading, onToggleBalance, isEthBalance };
}
