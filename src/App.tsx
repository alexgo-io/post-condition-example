import {useCallback, useEffect, useState} from "react";
import "./App.css";

import {AppConfig, openContractCall, showConnect, UserData, UserSession,} from "@stacks/connect";
import {
  AnchorMode,
  createFungiblePostCondition,
  FungibleConditionCode,
  optionalCVOf,
  principalCV,
  uintCV
} from "@stacks/transactions";

const appConfig = new AppConfig([]);
const userSession = new UserSession({ appConfig });
const appDetails = {
  name: "Alex Swap Example",
  icon: "https://cdn.alexlab.co/logos/ALEX_Token.png",
};

function App() {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  const onConnectWallet = useCallback(() => {
    showConnect({
      appDetails,
      onFinish: () => window.location.reload(),
      userSession,
    });
  }, []);

  return (
    <div>
      {userData == null ? (
        <button onClick={onConnectWallet}>Connect Wallet</button>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <button
            onClick={async () => {
              const stxAddress = userData!.profile.stxAddress.mainnet;
              const amount = 1000000000000000000n
              await openContractCall({
                anchorMode: AnchorMode.Any,
                contractAddress: 'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9',
                contractName: 'age000-governance-token',
                functionName: 'transfer-fixed',
                functionArgs: [uintCV(amount), principalCV(stxAddress), principalCV('SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9'), optionalCVOf(undefined)],
                postConditions: [createFungiblePostCondition(stxAddress, FungibleConditionCode.Equal, amount, 'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.age000-governance-token::alex')]
              });
            }}
          >
            Swap 1000000000000000000n
          </button>
          <button
            onClick={async () => {
              const stxAddress = userData!.profile.stxAddress.mainnet;
              const amount = 100000000000000000000n
              await openContractCall({
                anchorMode: AnchorMode.Any,
                contractAddress: 'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9',
                contractName: 'age000-governance-token',
                functionName: 'transfer-fixed',
                functionArgs: [uintCV(amount), principalCV(stxAddress), principalCV('SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9'), optionalCVOf(undefined)],
                postConditions: [createFungiblePostCondition(stxAddress, FungibleConditionCode.Equal, amount, 'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.age000-governance-token::alex')]
              });
            }}
          >
            Swap 100000000000000000000n
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
