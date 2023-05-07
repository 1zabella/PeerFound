// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
/*Importação de biblioteca que faz com que as equações da indenização funcionem, visto que com operações 
normais os valores resultantes estavam excedendo os limites do tipo de dados usado para armazenar o valor*/
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./teste.sol";

contract Loan is Ownable {
    using SafeMath for uint256;
    BTGDOL public stablecoin;
    address payable public contractOwner; //wallet BTG (administrador do contrato)
    uint256 public spread; //taxa que ficará para o BTG
    uint256 public amount; //valor que o seller quer investir
    uint256 public amountFinal; //valor que o seller receberá ao final de 1 ano (calculado com o juros informado no momento de investimento)
    address btgdol = 0x0172ae13E3583BF565957095D27caede3Abb172e; //conexão com a stablecoin
    address public collateral;
    address payable public seller; //waller de quem empresta o dinheiro
    mapping(address => uint256) public buyerAmount; //quanto de dinheiro será emprestado para cada um
    mapping(address => uint256) public finalValue; //quanto de dinheiro o buyer deve pagar ao fim do período
    // mapping(address => bool) buyerIsActive; //o buyer só poderá receber o empréstimo quando enviar seu token colateral para o contrato
    // modifier onlyOwner() {
    //     require(msg.sender == contractOwner);
    //     _;
    // }

    // modifier isActive(address _buyerAddress) {
    //     require(buyerIsActive[_buyerAddress]);
    //     _;
    // }

    constructor(
        uint256 _spread,
        uint256[] memory _finalValue,
        uint256[] memory _buyerAmount,
        address[] memory _buyers,
        address _contractOwner,
        address _seller,
        uint256 _amountFinal,
        uint256 _amount
    ) {
        contractOwner = payable(_contractOwner);
        spread = _spread;
        seller = payable (_seller);
        amount = _amount;
        amountFinal = _amountFinal;
        stablecoin = BTGDOL(btgdol);
        for (uint256 i = 0; i < _buyerAmount.length; i++) {
            buyerAmount[_buyers[i]] = _buyerAmount[i];
            finalValue[_buyers[i]] = _finalValue[i];
            // buyerIsActive[_buyers[i]] = false;
        }
    }

    // function onERC721Received(
    //     address operator,
    //     address from,
    //     uint256 tokenId,
    //     bytes memory data
    // ) public override returns (bytes4) {
    //     buyerIsActive[from] = true;
    //     return this.onERC721Received.selector;
    // }

    // A função abaixo serve para que o seller envie seu dinheiro para o contrato
    function getMoney() public payable {
        stablecoin.transferFrom(msg.sender, address(this), amount);
    }

    //A função abaixo serve para enviar o dinheiro requisitado do empréstimo do contrato para o buyer
    function sendLoan() public payable {
        stablecoin.transfer(msg.sender, buyerAmount[msg.sender]);
    }

    //A função abaixo serve para que o buyer envie o valor que pegou emprestado, com juros, para o contrato
    function payLoan() public payable {
        stablecoin.transferFrom(msg.sender, address(this), finalValue[msg.sender]);
    }

    //A função abaixo serve para que o contrato envie o valor que o buyer devia para o seller
    function sendLoanToSeller() public payable {
        stablecoin.transfer(seller, amountFinal);
    }
}
