import { useState } from "react";
import { Grid, Stack, TextField, Button } from "@mui/material";

import Web3 from "web3";
import { WEB3_LOCAL_URL, TO_DO_LIST_ABI, TO_DO_LIST_ADDRESS } from "../config";

const ToDoForm = ({ account, refreshTableFunction }) => {
  const [content, setContent] = useState("");

  const resetInputs = () => {
    setContent("");
  };

  const createButtonOnClickHandler = async () => {
    const web3 = new Web3(Web3.givenProvider || WEB3_LOCAL_URL);
    const contract = await new web3.eth.Contract(
      TO_DO_LIST_ABI,
      TO_DO_LIST_ADDRESS
    );

    const create = await contract.methods
      .createTask(content, account)
      .send({ from: account });

    console.log(create);
    refreshTableFunction();
    resetInputs();
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={0} sm={4} />
      <Grid item xs={12} sm={4} id="todoform-container">
        <Stack spacing={1}>
          <h4>Create new item</h4>
          <TextField
            label="Content"
            value={content}
            multiline
            rows={2}
            onChange={(e) => setContent(e.target.value)}
          ></TextField>
          <Button variant="outlined" onClick={createButtonOnClickHandler}>
            Create
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ToDoForm;
