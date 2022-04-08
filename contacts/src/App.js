import { useEffect, useState } from "react";
import Web3 from "web3";

const WEB3_LOCAL_URL = "http://localhost:7545";

const App = () => {
  const [account, setAccount] = useState();

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || WEB3_LOCAL_URL);
      const accounts = await web3.eth.requestAccounts();

      setAccount(accounts[0]);
    }

    load();
  }, []);

  return <div>Your account is: {account}</div>;
};

export default App;
