import { initGemFarm } from './gemfarm';
import { initGemBank } from './gemBank';
import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import env from 'react-dotenv';
import { fetchFarn, fetchFarmer, beginStaking } from './staker';

export async function superUnstakeMover(nfts, connection, wallet) {
  let gf = await initGemFarm(connection, wallet);
  let gb = await initGemBank(connection, wallet);

  const farmAcc = await fetchFarn(connection, wallet);
  const bank = farmAcc.bank;
  console.log('bank: ', bank);
  const farmerAcc = await fetchFarmer(connection, wallet);
  const vault = farmerAcc.farmerAcc.vault;
  console.log('vault: ', vault);

  if (farmerAcc.farmerAcc.gemsStaked.toString() === '1') {
    const endStakeResult = await endStaking(gf);
    const withdrawResult = await withdrawNftsOnChain(nfts, gb, bank, vault);
    console.log('ended staking for: ', nfts);
  } else if (
    farmerAcc.farmerAcc.gemsStaked.toString() != '1' &&
    farmerAcc.farmerState === 'staked'
  ) {
    console.log('farmer has more than 1 gem staked. Pausing stake');
    const endStakeResult = await endStaking(gf);
    const withdrawResult = await withdrawNftsOnChain(nfts, gb, bank, vault);
    console.log('resuming stake.');
    const stakeResult = await beginStaking(gf);
  } else {
    console.log('farmer stake amount not equal to 1');
    console.log('stake amount: ', farmerAcc.farmerAcc.gemsStaked.toString());
  }
}

export async function endStaking(gf) {
  const endStakeResults_1 = await gf.unstakeWallet(new PublicKey(env.farm_id));
  //calling a second time ends cooldown period
  const endStakeResults_2 = await gf.unstakeWallet(new PublicKey(env.farm_id));
  // await fetchFarmer();
  // selectedNFTs.value = [];
}

const withdrawGem = async (mint, bank, vault, gb) => {
  const { txSig } = await gb.withdrawGemWallet(bank, vault, new BN(1), mint);
  console.log('withdrawal done', txSig);
};

export async function withdrawNftsOnChain(nft, gb, bank, vault) {
  // const gemsResult = await addGems(nftArray, gf)
  // console.log("gemsResult: ", gemsResult)

  await withdrawGem(nft.mint, bank, vault, gb);
}
