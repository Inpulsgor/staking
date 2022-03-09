import { PublicKey, Connection } from '@solana/web3.js';
import { SignerWalletAdapter } from '@solana/wallet-adapter-base';
import { initGemFarm } from './gemfarm';
// import { fetchFarmer } from './staker';

const FARM_ID: any = process.env.REACT_APP_FARM_ID;

export const claim = async (
  farm: PublicKey,
  connection: Connection,
  wallet: SignerWalletAdapter,
) => {
  const gf: any = await initGemFarm(connection, wallet);
  const farmAcc = await gf.fetchFarmAcc(new PublicKey(FARM_ID));

  await gf.claimWallet(
    new PublicKey(FARM_ID),
    new PublicKey(farmAcc.rewardA.rewardMint),
    new PublicKey(farmAcc.rewardB.rewardMint),
  );

  //await fetchFarmer();
};
