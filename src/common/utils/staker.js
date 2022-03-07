import { BN } from '@project-serum/anchor';
import { initGemFarm } from './gemfarm';
import { initGemBank } from './gemBank';
import { PublicKey } from '@solana/web3.js';
import { stringifyPKsAndBNs } from '@gemworks/gem-farm-ts';

// const network = "https://api.devnet.solana.com";
// const connection = new Connection(network, "confirmed");
// async function getProvider() {
//     /* create the provider and return it to the caller */
//     /* network set to local network for now */
//     const network = "https://api.devnet.solana.com";
//     const connection = new Connection(network, opts.preflightCommitment);

//     const provider = new Provider(
//         connection, wallet, opts.preflightCommitment,
//     );
//     return provider;
// }
// const provider = await getProvider()
// let gb = await initGemBank(connection, provider)
// const bank = ref < PublicKey > ();
// const vault = ref < PublicKey > ();
// const vaultAcc = ref < any > ();
// const gdrs = ref < PublicKey[] > ([]);
// const vaultLocked = ref < boolean > (false);

export async function fetchFarn(connection, wallet) {
  // console.log('constructing farm');
  console.log('received wallet ', wallet.publicKey.toBase58());
  let gf = await initGemFarm(connection, wallet);
  console.log('gf is: ', gf);
  const farmAcc = await gf.fetchFarmAcc(
    new PublicKey(process.env.REACT_APP_FARM_ID),
  );
  console.log(
    `farm found at ${process.env.REACT_APP_FARM_ID}:`,
    stringifyPKsAndBNs(farmAcc),
  );
  return farmAcc;
}

export async function fetchFarmer(connection, wallet) {
  let gf = await initGemFarm(connection, wallet);
  const [farmerPDA] = await gf.findFarmerPDA(
    new PublicKey(process.env.REACT_APP_FARM_ID),
    wallet.publicKey,
  );
  const farmer = {};
  farmer.farmerIdentity = wallet.publicKey?.toBase58();
  farmer.farmerAcc = await gf.fetchFarmerAcc(farmerPDA);
  farmer.farmerState = gf.parseFarmerState(farmer.farmerAcc);
  //await updateAvailableRewards();
  console.log(
    `farmer found at ${farmer.farmerIdentity}:`,
    stringifyPKsAndBNs(farmer.farmerAcc),
  );
  return farmer;
}

export async function getFarmerDeets(connection, wallet) {
  let payload = [];
  const farmDeets = await fetchFarn(connection, wallet);
  payload.push(farmDeets);
  const farmerDeets = await fetchFarmer(connection, wallet);
  payload.push(farmerDeets);
  console.log('payload: ', payload);
  return payload;
}

export async function stakerMover(nft, connection, wallet) {
  let nftArray = [];
  nftArray.push(nft);
  console.log('selectedNfts: ', nft.mint.toBase58());
  let gb = await initGemBank(connection, wallet);
  console.log('gb: ', gb);
  let gf = await initGemFarm(connection, wallet);
  // const gemsResult = await addGems(nftArray, gf)
  // console.log("gemsResult: ", gemsResult)
  const farmAcc = await fetchFarn(connection, wallet);
  console.log('farmAcc: ', farmAcc);
  const bank = farmAcc.bank;
  console.log('bank: ', bank.toBase58());
  const farmerAcc = await fetchFarmer(connection, wallet);
  const vault = farmerAcc.farmerAcc.vault;
  console.log('vault: ', vault);
  const moveResult = await depositNftsOnChain(nftArray, gb, bank, vault);
  const stakeResult = await beginStaking(gf);
  return stakeResult;
}

export async function stakerMoreMover(nft, connection, wallet) {
  let nftArray = [];
  nftArray.push(nft);
  console.log('selectedNfts: ', nft.mint.toBase58());
  let gb = await initGemBank(connection, wallet);
  console.log('gb: ', gb);
  let gf = await initGemFarm(connection, wallet);
  const gemsResult = await addGems(nftArray, gf);
  console.log('gemsResult: ', gemsResult);
  // const farmAcc = await fetchFarn(connection, wallet)
  // console.log("farmAcc: ", farmAcc)
  // const bank = farmAcc.bank
  // console.log("bank: ", bank.toBase58())
  // const farmerAcc = await fetchFarmer(connection, wallet)
  // const vault = farmerAcc.farmerAcc.vault
  // console.log("vault: ", vault)
  // const moveResult = await depositNftsOnChain(nftArray, gb, bank, vault)
  const stakeResult = await beginStaking(gf);
  return stakeResult;
}

const depositGem = async (mint, creator, source, gb, bank, vault) => {
  const { txSig } = await gb.depositGemWallet(
    bank,
    vault,
    new BN(1),
    mint,
    source,
    creator,
  );
  console.log('deposit done', txSig);
};

export async function depositNftsOnChain(nfts, gb, bank, vault) {
  for (const nft of nfts) {
    console.log(nft);
    const creator = new PublicKey(
      //todo currently simply taking the 1st creator
      nft.onchainMetadata.data.creators[0].address,
    );
    console.log('creator is', creator.toBase58());
    const depositResult = await depositGem(
      nft.mint,
      creator,
      nft.pubkey,
      gb,
      bank,
      vault,
    );
    return depositResult;
  }
}

const addSingleGem = async (gemMint, gemSource, creator, gf) => {
  console.log('flash depost: ', gemMint.toBase58());
  await gf.flashDepositWallet(
    new PublicKey(process.env.REACT_APP_FARM_ID),
    '1',
    gemMint,
    gemSource,
    creator,
  );

  await fetchFarmer();
};

const addGems = async (selectedNFTs, gf) => {
  console.log('selected NFTs: ', selectedNFTs[0].mint.toBase58());
  await Promise.all(
    selectedNFTs.map(nft => {
      const creator = new PublicKey(
        //todo currently simply taking the 1st creator
        nft.onchainMetadata.data.creators[0].address,
      );
      console.log('creator is', creator.toBase58());
      addSingleGem(nft.mint, nft.pubkey, creator, gf);
    }),
  );
  console.log(`added another ${selectedNFTs.length} gems into staking vault`);
};

export async function beginStaking(gf) {
  const stakeResult = await gf.stakeWallet(
    new PublicKey(process.env.REACT_APP_FARM_ID),
  );
  return stakeResult;
  // const farmerResult = await fetchFarmer();
  // return farmerResult
}

// export async function depositNftsOnChain(nft) {

//     console.log(nft);
//     const creator = new PublicKey(
//         //todo currently simply taking the 1st creator
//         nft.onchainMetadata.data.creators[0].address
//     );
//     console.log('creator is', creator.toBase58());
//     await depositGem(nft.mint, creator, nft.pubkey);

// };
// export async function freshStart(wallet, connection) {
//     if (wallet && connection) {
//         const gf = await initGemFarm(connection, wallet);
//         farmerIdentity.value = wallet.publicKey?.toBase58();
//         //reset stuff
//         farmAcc.value = undefined;
//         farmerAcc.value = undefined;
//         farmerState.value = undefined;
//         availableA.value = undefined;
//         availableB.value = undefined;
//         try {
//             await fetchFarn();
//             await fetchFarmer(wallet);
//         } catch (e) {
//             console.log(`farm with PK ${process.env.REACT_APP_FARM_ID} not found :(`);
//         }
//     }
// };

// const depositGem = async (mint, creator, source) => {
//     const { txSig } = await gb.depositGemWallet(
//         bank.value,
//         vault.value,
//         new BN(1),
//         mint,
//         source,
//         creator
//     );
//     console.log('deposit done', txSig);
// };

// const addSingleGem = async (
//     gemMint,
//     gemSource,
//     creator
// ) => {
//     await gf.flashDepositWallet(
//         new PublicKey(process.env.REACT_APP_FARM_ID,
//         '1',
//         gemMint,
//         gemSource,
//         creator
//     );
//     await fetchFarmer();
// };
