const mapToWallet = walletEntity => {
  return {
    id: walletEntity.id,
    user_id: walletEntity.user_id,
    private_key: walletEntity.private_key,
    address: walletEntity.address,
  };
};

const mapToWalletArray = walletsEntities => {
  const wallets = [];

  for (const walletEntity of walletsEntities) {
    wallets.push(mapToWallet(walletEntity));
  }

  return wallets;
};

module.exports = {
  mapToWalletArray,
  mapToWallet,
};
