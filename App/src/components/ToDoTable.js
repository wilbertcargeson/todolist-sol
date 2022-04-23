import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Box,
  Checkbox,
  IconButton,
} from "@mui/material";

import Web3 from "web3";
import { WEB3_LOCAL_URL, TO_DO_LIST_ABI, TO_DO_LIST_ADDRESS } from "../config";
import Delete from "@mui/icons-material/Delete";

const ToDoTable = ({ refresh, account }) => {
  const [todolist, setTodolist] = useState([]);
  const [refreshComponentVar, refreshComponent] = useState(0);

  useEffect(() => {
    // Load list of appropriate todolist
    const loadTodolist = async () => {
      const web3 = new Web3(Web3.givenProvider || WEB3_LOCAL_URL);
      const contract = await new web3.eth.Contract(
        TO_DO_LIST_ABI,
        TO_DO_LIST_ADDRESS
      );

      // Get list of task ids
      const taskIds = await contract.methods.getTaskIds().call();

      const todolistFromEth = await Promise.all(
        taskIds.map(async (e) => {
          try {
            const task = await contract.methods.getTask(e).call();
            return task;
          } catch (e) {
            console.error(e);
          }
        })
      );

      setTodolist(
        todolistFromEth.filter(
          (e) => e !== undefined && e !== null && e[3] === account
        )
      );
      console.log(todolist);
    };
    loadTodolist();
  }, [refreshComponentVar, account, refresh]);

  const refreshfn = () => {
    refreshComponent((refresh) => refresh + 1);
  };

  const toggleToDo = async (taskId) => {
    const web3 = new Web3(Web3.givenProvider || WEB3_LOCAL_URL);
    const contract = await new web3.eth.Contract(
      TO_DO_LIST_ABI,
      TO_DO_LIST_ADDRESS
    );
    await contract.methods.toggleTask(taskId).send({ from: account });
    refreshfn();
  };

  const deleteToDo = async (taskId) => {
    const web3 = new Web3(Web3.givenProvider || WEB3_LOCAL_URL);
    const contract = await new web3.eth.Contract(
      TO_DO_LIST_ABI,
      TO_DO_LIST_ADDRESS
    );
    await contract.methods.deleteTask(taskId).send({ from: account });
    refreshfn();
  };

  const toDateTimeString = (epochS_str) => {
    const date = new Date(parseInt(epochS_str) * 1000);
    return date.toLocaleString();
  };

  return (
    <Box id="todotable-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Content</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Done</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todolist.map((todoitem, index) => (
            <TableRow key={todoitem[0]}>
              <TableCell>
                <b>{todoitem[2]}</b>
              </TableCell>
              <TableCell>{toDateTimeString(todoitem[1])}</TableCell>
              <TableCell>
                <Checkbox
                  checked={todoitem[4]}
                  onChange={(e) => {
                    todoitem[4] = e.target.value;
                    toggleToDo(todoitem[0]);
                  }}
                ></Checkbox>
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => {
                    deleteToDo(todoitem[0]);
                  }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ToDoTable;
