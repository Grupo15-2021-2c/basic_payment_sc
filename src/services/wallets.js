const ethers = require("ethers");
const accounts = require("../service/wallet_service");

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  return wallet;
};

const createWallet = () => async id => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  // This may break in some environments, keep an eye on it
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const walletsCount = (await accounts.countWallet()) + 1;

  return await accounts.create({
    id: walletsCount.toString(),
    user_id: id,
    address: wallet.address,
    private_key: wallet.privateKey,
  });
};

const getWalletsData = () => () => {
  return accounts.findAll();
};

const getWalletData = () => index => {
  return accounts.findById(index);
};

const getWalletIdWithUserId = async userId => {
  return (await accounts.findByUserId(userId)).id;
};

const getWallet = async index => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  return new ethers.Wallet((await getWalletData()(index)).private_key, provider);
};

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet,
  getWalletIdWithUserId,
});
