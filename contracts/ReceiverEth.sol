// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ReceiverEth {
    event Log(uint256 amount, uint256 gas);

    receive() external payable {
        emit Log(msg.value, gasleft());
    }
}
