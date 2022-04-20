// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// pragma abicoder v2;

contract ToDo {
    struct Task {
        uint256 id;
        uint256 date;
        string content;
        string author;
        bool done;
    }

    uint256 lastId;
    uint256[] taskIds;
    mapping(uint256 => Task) tasks;

    constructor() {
        lastId = 1;
    }

    event TaskCreated(uint256, uint256, string, string, bool);

    // Create a new task
    function createTask(string memory _content, string memory _author) public {
        tasks[lastId] = Task(lastId, block.timestamp, _content, _author, false);
        emit TaskCreated(lastId, block.timestamp, _content, _author, false);
        taskIds.push(lastId);
        lastId++;
    }

    function getTaskIds() public view returns (uint256[] memory) {
        return taskIds; // Can't we just map the keys?
    }

    // Get task
    function getTask(uint256 id)
        public
        view
        tasksExists(id)
        returns (
            uint256,
            uint256,
            string memory,
            string memory,
            bool
        )
    {
        return (
            id,
            tasks[id].date,
            tasks[id].content,
            tasks[id].author,
            tasks[id].done
        );
    }

    // Modifier runs before a function
    // This modifier checks if the task per id exists
    modifier tasksExists(uint256 id) {
        if (tasks[id].id == 0) {
            revert();
        }
        _;
    }

    // Getter for last id
    function getLastId() public view returns (uint256) {
        return lastId;
    }
}
