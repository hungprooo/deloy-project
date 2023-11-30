const Token = artifacts.require("Mytoken");

var chai =  require("chai" );
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", function (accounts) {

    const[initialHolder, recipient, anotherAccount] = accounts;

    beforeEach( async() => {
        this.myToken = await Token.new(1000);
    })

    it("All tokens be in my account", async () => {
        //let instance = await Token.deployed();
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();

        await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
    }); 
    it("I can send tokens from accout 1 to account 2", async () => {
        const sendTokens = 1;
        // let instance = await Token.deployed();
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(recipient,sendTokens)).to.eventually.be.fulfilled;
        await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    })

    it("It not possible to send more 1 than Tokens has", async () => {
        // let instance = await Token.deployed();
        let instance = this.myToken;
        let balanceOfAccount = await instance.balanceOf(initialHolder);

        await expect(instance.transfer(recipient,new BN (balanceOfAccount + 1))).to.eventually.be.rejected;
        await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
    })
})

// const Token = artifacts.require("Mytoken");

// var chai =  require("chai" );
// const BN = web3.utils.BN;
// const chaiBN = require("chai-bn")(BN);
// chai.use(chaiBN);

// var chaiAsPromised = require("chai-as-promised");
// chai.use(chaiAsPromised);

// const expect = chai.expect;

// contract("Token Test", async (accounts) => {
//     const[initialHolder, recipient, anotherAccount] = accounts;
//     it("All tokens be in my account", async () => {
//         let instance = await Token.deployed();
//         let totalSupply = await instance.totalSupply();

//         await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
//     }); 
//     it("I can send tokens from accout 1 to account 2", async () => {
//         const sendTokens = 1;
//         let instance = await Token.deployed();
//         let totalSupply = await instance.totalSupply();
//         await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
//         await expect(instance.transfer(recipient,sendTokens)).to.eventually.be.fulfilled;
//         await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
//         await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
//     })

//     it("It not possible to send more 1 than Tokens has", async () => {
//         let instance = await Token.deployed();
//         let balanceOfAccount = await instance.balanceOf(initialHolder);

//         await expect(instance.transfer(recipient,new BN (balanceOfAccount + 1))).to.eventually.be.rejected;
//         await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
//     })
// })