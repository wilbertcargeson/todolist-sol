import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Box,
  Checkbox,
} from "@mui/material";

const ToDoTable = ({}) => {
  const [done, setDone] = useState(false); // Temporary for testing purposes

  /**
     * data is the contract in JSON
     *  uint256 id;
        uint256 date;
        string content;
        string author;
        bool done;
     */

  const data = [
    {
      id: 1,
      date: Date.now().toString(),
      content: "test",
      author: "test",
      done: false,
    },
  ];

  const completeToDo = (e) => {
    // Set to do list to complete in DB
    data[0].done = e.target.checked;
  };

  return (
    <Box id="todotable-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Done</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell>{contract.id}</TableCell>
              <TableCell>{contract.date}</TableCell>
              <TableCell>{contract.content}</TableCell>
              <TableCell>{contract.author}</TableCell>
              <TableCell>
                <Checkbox
                  checked={done}
                  onChange={(e) => setDone(e.target.checked)}
                ></Checkbox>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ToDoTable;
