import env from 'react-dotenv';
import { PublicKey, Connection } from '@solana/web3.js';
import { SignerWalletAdapter } from '@solana/wallet-adapter-base';
import { initGemFarm } from './gemfarm';
import { fetchFarmer } from './staker';

export const claim = async (
  farm: PublicKey,
  connection: Connection,
  wallet: SignerWalletAdapter,
) => {
  console.log('farm: ', farm);
  let gf: any = await initGemFarm(connection, wallet);
  //console.log("gf is: ", gf)
  const farmAcc = await gf.fetchFarmAcc(new PublicKey(env.farm_id));
  await gf.claimWallet(
    new PublicKey(env.farm_id),
    new PublicKey(farmAcc.rewardA.rewardMint),
    new PublicKey(farmAcc.rewardB.rewardMint),
  );

  //await fetchFarmer();
};
