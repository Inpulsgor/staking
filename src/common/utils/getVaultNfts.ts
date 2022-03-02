import axios from 'axios';
import env from 'react-dotenv';
import { Connection, PublicKey } from '@solana/web3.js';
import { SignerWalletAdapter } from '@solana/wallet-adapter-base';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { programs } from '@metaplex/js';
import { initGemBank } from './gemBank';
import { fetchFarmer } from './staker';
import { getNFTMetadataForMany } from './getNfts';

const {
  metadata: { Metadata },
} = programs;

export const populateVaultNFTs = async (
  connection: Connection,
  wallet: SignerWalletAdapter,
) => {
  // zero out to begin with
  let currentVaultNFTs = [];
  //const selectedVaultNFTs = [];
  let desiredVaultNFTs = [];

  let gb = await initGemBank(connection, wallet);
  const farmerAcc: any = await fetchFarmer(connection, wallet);
  const vault = farmerAcc.farmerAcc.vault;
  let foundGDRs = await gb.fetchAllGdrPDAs(vault);

  if (foundGDRs && foundGDRs.length) {
    let gdrs = foundGDRs;
    console.log(`found a total of ${foundGDRs.length} gdrs`);
    let mints = foundGDRs.map(gdr => {
      console.log('gdrPub: ', gdr.publicKey.toBase58());
      console.log(gdr);
      return { mint: gdr.account.gemMint };
    });
    currentVaultNFTs = await getNFTMetadataForMany(mints, connection);

    desiredVaultNFTs = [...currentVaultNFTs];
    console.log(`populated a total of ${currentVaultNFTs.length} vault NFTs`);

    return currentVaultNFTs;
  }
};
