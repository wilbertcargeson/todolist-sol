import { useState } from "react";
import { Grid, Stack, TextField, Button } from "@mui/material";

import Web3 from "web3";
import { WEB3_LOCAL_URL, TO_DO_LIST_ABI, TO_DO_LIST_ADDRESS } from "../config";

const ToDoForm = ({ account, refreshTableFunction }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const resetInputs = () => {
    setAuthor("");
    setContent("");
  };

  const createButtonOnClickHandler = async () => {
    const web3 = new Web3(Web3.givenProvider || WEB3_LOCAL_URL);
    const contract = await new web3.eth.Contract(
      TO_DO_LIST_ABI,
      TO_DO_LIST_ADDRESS
    );

    console.log(content, author);

    const create = await contract.methods
      .createTask(content, author)
      .send({ from: account });

    console.log(create);
    refreshTableFunction();
    resetInputs();
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <TextField
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></TextField>
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
