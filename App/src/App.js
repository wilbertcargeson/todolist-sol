import { useEffect, useState } from "react";
import ToDoForm from "./components/ToDoForm";
import "./App.css";
import ToDoTable from "./components/ToDoTable";
import Web3 from "web3";
import { WEB3_LOCAL_URL } from "./config";
import { Box } from "@mui/material";

const App = () => {
  const [account, setAccount] = useState("");
  const [toRefreshTable, setToRefreshTable] = useState(0);

  useEffect(() => {
    async function loadBlockchain() {
      const web3 = new Web3(Web3.givenProvider || WEB3_LOCAL_URL);
      const accounts = await web3.eth.requestAccounts();
      console.log(accounts);
      setAccount(accounts[0]);
    }
    loadBlockchain();
  }, []);

  return (
    <>
      <div>Your account is: {account}</div>
      <br />
      <Box>
        <ToDoForm
          account={account}
          refreshTableFunction={() => {
            setToRefreshTable(toRefreshTable + 1);
          }}
        />
      </Box>
      <ToDoTable refresh={toRefreshTable} />
    </>
  );
};

export default App;
