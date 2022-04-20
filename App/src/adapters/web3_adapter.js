/**
 * Web3 adapter for app
 */

import Web3 from "web3";
import { TO_DO_LIST_ABI, TO_DO_LIST_ADDRESS } from "../config";


const createToDoItem = (content, author) => {
    const web3 = new Web3(Web3.givenProvider || WEB3_LOCAL_URL);
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const todolistContract = await new web3.eth.Contract(
        TO_DO_LIST_ABI,
        TO_DO_LIST_ADDRESS
      );
      
}