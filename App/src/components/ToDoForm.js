import { useState } from "react";
import { Grid, Stack, TextField, Button } from "@mui/material";

const ToDoForm = () => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const createButtonOnClickHandler = () => {
    alert(`${author}${content}`);
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
