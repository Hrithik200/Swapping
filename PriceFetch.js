const ethers = require("ethers");
const { factoryAddress, routerAddress, fromAddress, toAddress } = require("./AddressList");
const { erc20ABI, factoryABI, pairABI, routerABI } = require("./AbiInfo");

// need to connected Blockchain so we need provider RPC SERVER
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org/");
// creating object
const factoryInstance = new ethers.Contract(factoryAddress, factoryABI, provider);
//console.log(factoryInstance);

const routerInstance = new ethers.Contract(routerAddress, routerABI, provider);

const priceFetch = async (amount) => {
    const token1 = new ethers.Contract(fromAddress, erc20ABI, provider);
    const token2 = new ethers.Contract(toAddress, erc20ABI, provider);

    const decimal1 = await token1.decimals();

    const amountIn = ethers.utils.parseUnits(humanFormat, decimal1).toString();

    console.log("BUSD Decimals->", amountIn);

    const amountOut = await routerInstance.getAmountsOut(amountIn, [fromAddress, toAddress]);

    const humanOutput = ethers.utils.formatUnits(amountOut[1].toString(), decimal1);
    
    console.log("Human Output", humanOutput);
};
humanFormat = "100"; // change here the amoubt you want to check
priceFetch(humanFormat);
