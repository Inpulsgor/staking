import { FC, useState, useEffect } from 'react';
import { Box, Button as MuiButton, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import {
  Wallet,
  useWallet,
  WalletProvider,
  ConnectionProvider,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import env from 'react-dotenv';

import { PageContainer } from 'common/layout';
import { InfoItem, Button } from 'common/components';
import {
  ButtonColor,
  ButtonVariant,
} from 'common/components/Button/Button.types';
import { BorderColor } from 'common/components/InfoItem/InfoItem.types';
import { ReactComponent as ArrowLeftIcon } from 'assets/icons/left.svg';
import { ReactComponent as ArrowRightIcon } from 'assets/icons/right.svg';
import account from 'common/static/account.json';
import styles from './Home.styles';

import { getNFTsByOwner, getNFTMetadataForMany } from 'common/utils/getNfts';
import {
  fetchFarn,
  fetchFarmer,
  stakerMover,
  stakerMoreMover,
} from 'common/utils/staker';
import { populateVaultNFTs } from 'common/utils/getVaultNfts';
import idl from 'common/static/idl.json';

import { superUnstakeMover } from 'common/utils/unstaker';
import { claim } from 'common/utils/claimer';
require('@solana/wallet-adapter-react-ui/styles.css');

// 5FoL7bx9zzTqvJDocvJRrYwzvMHXaQJwwzjbHBNrE3Kf

// const wallets = [
//   /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
//   new PhantomWalletAdapter(),
// ];

// const opts: any = {
//   preflightCommitment: 'processed',
// };
// const programID = new PublicKey(env.farm_id);

const Home: FC = () => {
  const [value, setValue] = useState(null);
  const [farmerState, setFarmerState] = useState(null);
  const [stakedValue, setStakedValue] = useState(null);
  const [rewardValue, setRewardValue] = useState(null);
  const wallet: any = useWallet();

  // async function getProvider() {
  //   /* create the provider and return it to the caller */
  //   /* network set to local network for now */
  //   const network = 'https://api.devnet.solana.com';
  //   const connection = new Connection(network, opts.preflightCommitment);

  //   const provider = new Provider(connection, wallet, opts.preflightCommitment);
  //   return provider;
  // }

  // async function claimRewards() {
  //   const network = 'https://api.devnet.solana.com';
  //   const connection = new Connection(network, opts.preflightCommitment);
  //   const farm: any = await fetchFarn(connection, wallet);
  //   const claimResults = await claim(farm, connection, wallet);
  // }

  // async function refreshAll() {
  //   await getUnstakedNfts();
  //   await getStakedNfts();
  //   await getRewardA();
  // }

  // async function getRewardA() {
  //   const network = 'https://api.devnet.solana.com';
  //   const connection = new Connection(network, opts.preflightCommitment);
  //   const farmerAcc: any = await fetchFarmer(connection, wallet);
  //   const diff =
  //     farmerAcc.farmerAcc.rewardA.accruedReward -
  //     farmerAcc.farmerAcc.rewardA.paidOutReward;
  //   console.log('reward amount: ', diff.toString());
  //   const rewardA: any = diff.toString();
  //   setRewardValue(rewardA);
  // }

  // async function getUnstakedNfts() {
  //   const provider = await getProvider();
  //   const network = 'https://api.devnet.solana.com';
  //   const connection = new Connection(network, opts.preflightCommitment);

  //   const providerPublicKey = new PublicKey(provider.wallet.publicKey);
  //   const nfts = await getNFTsByOwner(providerPublicKey, connection);
  //   const nftdata: any = await getNFTMetadataForMany(nfts, connection);
  //   // for (let nft of nfts) {
  //   //   console.log(nft.onchainMetadata.data.name);
  //   // }

  //   setValue(nftdata);
  // }

  // async function getStakedNfts() {
  //   // console.log("viewing staked nfts")
  //   // console.log(wallet.publicKey.toBase58())
  //   const network = 'https://api.devnet.solana.com';
  //   const connection = new Connection(network, opts.preflightCommitment);

  //   const farmStarted = await fetchFarn(connection, wallet);
  //   console.log('started: ', farmStarted);
  //   const farmerStarted: any = await fetchFarmer(connection, wallet);
  //   console.log('started: ', farmerStarted);
  //   const gdrs: any = await populateVaultNFTs(connection, wallet);
  //   setFarmerState(farmerStarted.farmerState);
  //   setStakedValue(gdrs);
  // }

  // async function stakeNft(nft: any) {
  //   const network = 'https://api.devnet.solana.com';
  //   const connection = new Connection(network, opts.preflightCommitment);
  //   console.log('staking nft', nft.onchainMetadata.mint);
  //   const stakeResult = await stakerMover(nft, connection, wallet);
  //   console.log(stakeResult);
  //   const farmerStarted: any = await fetchFarmer(connection, wallet);
  //   setFarmerState(farmerStarted.farmerState);
  //   await refreshAll();
  // }

  // async function stakeMoreNfts(nft: any) {
  //   const network = 'https://api.devnet.solana.com';
  //   const connection = new Connection(network, opts.preflightCommitment);
  //   console.log('staking additional nft', nft.onchainMetadata.mint);
  //   const stakeResult = await stakerMoreMover(nft, connection, wallet);
  //   console.log(stakeResult);
  //   const farmerStarted: any = await fetchFarmer(connection, wallet);
  //   setFarmerState(farmerStarted.farmerState);
  //   await refreshAll();
  // }

  // async function withdrawStake(nfts: any) {
  //   const network = 'https://api.devnet.solana.com';
  //   const connection = new Connection(network, opts.preflightCommitment);
  //   const endStakeResults = await superUnstakeMover(nfts, connection, wallet);
  //   console.log(endStakeResults);
  //   await refreshAll();
  // }

  return (
    <>
      <Helmet>
        <title>Stacking</title>
        <meta name="description" content="Stacking" />
      </Helmet>

      <PageContainer>
        <Box sx={styles.wallet} component="section">
          <Box sx={styles.walletBox}>
            <Typography sx={styles.walletTitle} variant="body2">
              Your Wallet
            </Typography>
            <Box sx={styles.walletList}></Box>
          </Box>

          <Box sx={styles.buttonsBox}>
            <MuiButton sx={styles.arrowBtn}>
              <ArrowLeftIcon />
            </MuiButton>
            <MuiButton sx={styles.arrowBtn}>
              <ArrowRightIcon />
            </MuiButton>
          </Box>

          <Box sx={styles.vaultBox}>
            <Typography sx={styles.walletTitle} variant="body2">
              Your Vault
            </Typography>
            <Box sx={styles.walletList}></Box>
          </Box>
        </Box>

        <Box sx={styles.account} component="section">
          <Typography sx={styles.accountTitle}>
            Your Stacking Account
          </Typography>

          <Box sx={styles.accountInfo}>
            {account.items.map(({ label, value, id }) => (
              <InfoItem
                key={id}
                label={label}
                value={value}
                borderColor={BorderColor.light}
              />
            ))}
          </Box>
        </Box>

        <Box sx={styles.rewards} component="section">
          <Box sx={styles.rewardItem}>
            <Typography sx={styles.rewardTitle}>Reward A</Typography>
            <Box sx={styles.rewardTable}>
              {account.items.map(({ label, value, id }) => (
                <InfoItem
                  key={id}
                  label={label}
                  value={value}
                  borderColor={BorderColor.dark}
                />
              ))}
            </Box>
          </Box>
          <Box sx={styles.rewardItem}>
            <Typography sx={styles.rewardTitle}>Reward B</Typography>
            <Box sx={styles.rewardTable}>
              {account.items.map(({ label, value, id }) => (
                <InfoItem
                  key={id}
                  label={label}
                  value={value}
                  borderColor={BorderColor.dark}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Button
          title="Refresh Account"
          color={ButtonColor.white}
          customStyles={styles.refreshBtn}
          customVariant={ButtonVariant.outlined}
        />
      </PageContainer>
    </>
  );
};

export default Home;
