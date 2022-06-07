// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract SendEther {
    constructor() payable {}

    receive() external payable {}

    function sendViaTransfer(address payable _to) external payable {
        _to.transfer(1);
    }

    function sendViaSend(address payable _to) external payable {
        bool sent = _to.send(1);
        require(sent, "send failed");
    }

    function sendViaCall(address payable _to) external payable {
        (bool success, ) = _to.call{value: 1}("");
        require(success, "call failed");
    }
}
