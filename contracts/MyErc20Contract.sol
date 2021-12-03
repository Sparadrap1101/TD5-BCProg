pragma solidity >=0.6.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyErc20Contract is IERC20
{
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    mapping (address => bool) public whitelist;
    uint256 public override totalSupply;
    string public name;
    string public symbolx;
    uint256 private ethReceived;

    constructor(uint256 _initialAmount, string memory _tokenName, string  memory _tokenSymbol) public {
        balances[msg.sender] = _initialAmount;
        totalSupply = _initialAmount;
        name = _tokenName;
        symbolx = _tokenSymbol;
    }

    function transfer(address _to, uint256 _value) public override returns (bool success) {
    }

    function transferFrom(address _from, address _to, uint256 _value) public override returns (bool success) {
    }

    function balanceOf(address _owner) public override view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public override returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        return true;
    }

    function allowance(address _owner, address _spender) public override view returns (uint256 remaining) {
    }

  function symbol() external view returns (string memory) {
      return symbolx;
  }
    
  function getToken() external onlyWhitelist returns (bool) {
      uint initialBalance = balances[msg.sender];
      balances[msg.sender] += 1000000;
      totalSupply += 1000000;
      return initialBalance < balances[msg.sender];
  }

  function buyToken() external payable returns (bool) {
      //require(msg.value >= 1 wei);
      //ethReceived += msg.value;
      
      //uint initialBalance = balances[msg.sender];
      //balances[msg.sender] += msg.value;
     // totalSupply += msg.value;

      return true; //initialBalance < balances[msg.sender];
  }

  function isCustomerWhiteListed(address addressWhitelist) external view returns (bool) {
      return whitelist[addressWhitelist];
  }

  function setWhitelist(address addressToChange, bool newWhitelist) external returns (bool) {
      whitelist[addressToChange] = newWhitelist;
      return whitelist[addressToChange];
  }

  modifier onlyWhitelist() {
      require(whitelist[msg.sender]);
      _;
  }
}