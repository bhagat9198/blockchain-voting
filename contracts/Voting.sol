// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.7.0;

// pragma experimental ABIEncoderV2;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    // struct Voter {
    //     bool voted;
    //     uint256 voteIndex;
    //     uint256 weight;
    // }

    // address public owner;
    // string public name;
    // mapping(address => Voter) public voters;

    Candidate[] public candidates;
    // uint256 public auctionEnd;

    event ElectionResult(string name, uint256 voteCount);

    // function initElection(
    //   string memory name,
    //   string memory candidatel,
    //   string memory candidate2
    // ) public {
    //   owner = msg.sender;
    //   name = name;
    //   // auctionEnd = now + (durationMinutes * 1 minutes);

    //   candidates.push(Candidate(candidatel, 0));
    //   candidates.push(Candidate(candidate2, 0));
    // }

    function addParty(string memory partyId) public {
        candidates.push(Candidate(partyId, 0));
    }

    // function authorize(address voter) public {
    //     require(msg.sender == owner);
    //     require(!voters[voter].voted);

    //     voters[voter].weight = 1;
    // }

    function vote(uint256 voteIndex) public {
        // require(now < auctionEnd);
        // require(!voters[msg.sender].voted);

        // voters[msg.sender].voted = true;
        // voters[msg.sender].voteIndex = voteIndex;
        candidates[voteIndex].voteCount += 1;
    }

    function end() public {
        // require(msg.sender == owner);
        // require(now >= auctionEnd);

        for (uint256 i = 0; i < candidates.length; i++) {
            emit ElectionResult(candidates[i].name, candidates[i].voteCount);
        }
    }

    function getAllData() public view returns (Candidate[] memory) {
        Candidate[] memory id = new Candidate[](candidates.length);
        for (uint256 i = 0; i < candidates.length; i++) {
            Candidate storage can = candidates[i];
            id[i] = can;
        }
        return id;
    }

    function getLength() public view returns (uint256) {
        return candidates.length;
    }

    uint256 storedData;

    function set(uint256 x) public {
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}
