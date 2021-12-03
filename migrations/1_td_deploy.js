const Str = require('@supercharge/strings')
// const BigNumber = require('bignumber.js');

//var TDErc20 = artifacts.require("ERC20TD.sol");
var evaluator = artifacts.require("Evaluator.sol");
var myErc20Contract = artifacts.require("MyErc20Contract.sol");


module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        //await deployTDToken(deployer, network, accounts); 
        await deployEvaluator(deployer, network, accounts); 
        //await setPermissionsAndRandomValues(deployer, network, accounts); 
        //await deployRecap(deployer, network, accounts); 
		await deployMyErc20(deployer, network, accounts);
		await submitExercice(deployer, network, accounts);
		//await getToken(deployer, network, accounts);
		//await buyToken(deployer, network, accounts);
		await denyAccess(deployer, network, accounts);
		await allowAccess(deployer, network, accounts);
    });
};

async function deployTDToken(deployer, network, accounts) {
	TDToken = await TDErc20.new("TD-ERC20-101","TD-ERC20-101",web3.utils.toBN("20000000000000000000000000000"))
}

async function deployEvaluator(deployer, network, accounts) {
	Evaluator = await evaluator.at("0xcff8985FF63cDce92036A2747605FB7ead26423e");
}

async function deployMyErc20(deployer, network, accounts) {
	await Evaluator.ex1_getTickerAndSupply();
	const supply = await Evaluator.readSupply(accounts[0]);
	const ticker = await Evaluator.readTicker(accounts[0]);
	console.log("\n> Supply: ", supply.toString());
	console.log("> Ticker: ", ticker);
	MyErc20Token = await myErc20Contract.new(supply, ticker, ticker);
}

async function submitExercice(deployer, network, accounts) {
	console.log("\n> Submit: ", await Evaluator.exerciceProgression(accounts[0], 0));
	await Evaluator.submitExercice(MyErc20Token.address);
	console.log("> Submit: ", await Evaluator.exerciceProgression(accounts[0], 0));
	console.log("\n> Exo2: ", await Evaluator.exerciceProgression(accounts[0], 2));
	await Evaluator.ex2_testErc20TickerAndSupply();
	console.log("> Exo2: ", await Evaluator.exerciceProgression(accounts[0], 2));
}

async function getToken(deployer, network, accounts) {
	console.log("\n> Exo3: ", await Evaluator.exerciceProgression(accounts[0], 3));
	console.log(">>  Balance before getToken(): ", (await MyErc20Token.balanceOf(Evaluator.address)).toString());
	await Evaluator.ex3_testGetToken();
	console.log(">>  Balance after getToken(): ", (await MyErc20Token.balanceOf(Evaluator.address)).toString());
	console.log("> Exo3: ", await Evaluator.exerciceProgression(accounts[0], 3));
}

async function buyToken(deployer, network, accounts) {
	console.log("\n> Exo4: ", await Evaluator.exerciceProgression(accounts[0], 4));
	console.log(">>  Balance before buyToken(): ", (await MyErc20Token.balanceOf(Evaluator.address)).toString());
	//Evaluator.sendTransaction({from:accounts[0],value:1000000000000000000});
	await Evaluator.ex4_testBuyToken();
	console.log(">>  Balance after buyToken(): ", (await MyErc20Token.balanceOf(Evaluator.address)).toString());
	console.log("> Exo4: ", await Evaluator.exerciceProgression(accounts[0], 4));
}

async function denyAccess(deployer, network, accounts) {
	console.log("\n> Exo5: ", await Evaluator.exerciceProgression(accounts[0], 5));
	await Evaluator.ex5_testDenyListing();
	console.log("> Exo5: ", await Evaluator.exerciceProgression(accounts[0], 5));
}

async function allowAccess(deployer, network, accounts) {
	console.log("\n> Exo6: ", await Evaluator.exerciceProgression(accounts[0], 6));
	console.log(">>  Whitelist: ", await MyErc20Token.whitelist(Evaluator.address));
	await MyErc20Token.setWhitelist(Evaluator.address, true);
	console.log(">>  Whitelist: ", await MyErc20Token.whitelist(Evaluator.address));
	await Evaluator.ex6_testAllowListing();
	console.log("> Exo6: ", await Evaluator.exerciceProgression(accounts[0], 6));
}

async function setPermissionsAndRandomValues(deployer, network, accounts) {
	await TDToken.setTeacher(Evaluator.address, true)
	randomSupplies = []
	randomTickers = []
	for (i = 0; i < 20; i++)
		{
		randomSupplies.push(Math.floor(Math.random()*1000000000))
		randomTickers.push(Str.random(5))
		// randomTickers.push(web3.utils.utf8ToBytes(Str.random(5)))
		// randomTickers.push(Str.random(5))
		}

	console.log(randomTickers)
	console.log(randomSupplies)
	// console.log(web3.utils)
	// console.log(type(Str.random(5)0)
	await Evaluator.setRandomTickersAndSupply(randomSupplies, randomTickers);
}

async function deployRecap(deployer, network, accounts) {
	console.log("TDToken " + TDToken.address)
	console.log("Evaluator " + Evaluator.address)
	console.log("\n----------------------------------------------------------")
}