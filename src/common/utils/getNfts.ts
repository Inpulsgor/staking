import axios from 'axios';
import env from 'react-dotenv';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { programs } from '@metaplex/js';

export interface INFT {
  pubkey?: PublicKey;
  mint: PublicKey;
  onchainMetadata: unknown;
  externalMetadata: unknown;
}

const {
  metadata: { Metadata },
} = programs;

const getTokensByOwner = async (owner: PublicKey, conn: Connection) => {
  const tokens = await conn.getParsedTokenAccountsByOwner(owner, {
    programId: TOKEN_PROGRAM_ID,
  });

  // initial filter - only tokens with 0 decimals & of which 1 is present in the wallet
  return tokens.value
    .filter(t => {
      const amount = t.account.data.parsed.info.tokenAmount;

      return amount.decimals === 0 && amount.uiAmount === 1;
    })
    .map(t => {
      return { pubkey: t.pubkey, mint: t.account.data.parsed.info.mint };
    });
};

const getNFTMetadata = async (
  mint: string,
  conn: Connection,
  pubkey: string,
): Promise<INFT | undefined> => {
  // console.log('Pulling metadata for:', mint);
  try {
    const metadataPDA = await Metadata.getPDA(mint);
    const onchainMetadata = (await Metadata.load(conn, metadataPDA)).data;
    const externalMetadata = (await axios.get(onchainMetadata.data.uri)).data;

    return {
      pubkey: pubkey ? new PublicKey(pubkey) : undefined,
      mint: new PublicKey(mint),
      onchainMetadata,
      externalMetadata,
    };
  } catch (e) {
    console.log(`failed to pull metadata for token ${mint}`);
  }
};

const getNFTMetadataForMany = async (
  tokens: any[],
  conn: Connection,
): Promise<INFT[]> => {
  const promises: any = [];
  let returnedNfts = [];

  tokens.forEach(t => promises.push(getNFTMetadata(t.mint, conn, t.pubkey)));

  const nfts = (await Promise.all(promises)).filter(n => !!n);

  console.log(`found ${nfts.length} metadatas`);
  console.log(nfts);

  nfts.map(nfts => {
    returnedNfts.push(nfts.onchainMetadata);
  });

  // console.log('post map: ', returnedNfts.data);

  return nfts as INFT[];
};

const getNFTsByOwner = async (
  owner: PublicKey,
  conn: Connection,
): Promise<INFT[]> => {
  const tokens = await getTokensByOwner(owner, conn);
  console.log(`found ${tokens.length} tokens`);

  return await getNFTMetadataForMany(tokens, conn);
};

export {
  getTokensByOwner,
  getNFTMetadata,
  getNFTMetadataForMany,
  getNFTsByOwner,
};
