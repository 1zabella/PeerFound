// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

import "./loan.sol";

contract factory {
    address owner;

    address[] public emprestimos;

    constructor() {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(owner == msg.sender, "Not owner");
        _;
    }

    function viewLoans() public view returns (address[] memory) {
        return emprestimos;
    }

    function createLoan(
        uint256 _spread,
        uint256[] memory _finalValue,
        uint256[] memory _buyerAmount,
        address[] memory _buyers,
        address _contractOwner,
        address _seller,
        uint256 _amountFinal,
        uint256 _amount
    ) public isOwner {
        Loan emprestimo = new Loan(
            _spread,
            _finalValue,
            _buyerAmount,
            _buyers,
            _contractOwner,
            _seller,
            _amountFinal,
            _amount
        );
        emprestimos.push(address(emprestimo));
    }
}
