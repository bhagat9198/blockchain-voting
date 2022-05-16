pragma solidity ^0.8.1;

contract Election {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    struct Voter {
        bool voted;
        uint256 voteIndex;
        uint256 weight;
    }

    address public owner;
    string public name;
    mapping(address => Voter) public voters;

    Candidate[] public candidates;
    uint256 public auctionEnd;

    event ElectionResult(string name, uint256 voteCount);

    constructor(
        string memory name,
        string memory candidatel,
        string memory candidate2
    ) {
        owner = msg.sender;
        name = name;
        // auctionEnd = now + (durationMinutes * 1 minutes);

        candidates.push(Candidate(candidatel, 0));
        candidates.push(Candidate(candidate2, 0));
    }

    function authorize(address voter) public {
        require(msg.sender == owner);
        require(!voters[voter].voted);

        voters[voter].weight = 1;
    }

    function vote(uint256 voteIndex) public {
        // require(now < auctionEnd);
        require(!voters[msg.sender].voted);

        voters[msg.sender].voted = true;
        voters[msg.sender].voteIndex = voteIndex;
        candidates[voteIndex].voteCount += 1;
    }

    function end() public {
        require(msg.sender == owner);
        // require(now >= auctionEnd);

        for (uint256 i = 0; i < candidates.length; i++) {
            emit ElectionResult(candidates[i].name, candidates[i].voteCount);
        }
    }
}
