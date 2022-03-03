import { FC, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import env from 'react-dotenv';

import { PageContainer } from 'common/layout';
import {
  Button,
  Reward,
  Loader,
  Account,
  WalletFarmer,
  NotificationPopup,
} from 'common/components';
import {
  ButtonColor,
  ButtonVariant,
} from 'common/components/Button/Button.types';
import { AlertState } from 'common/components/NotificationPopup/NotificationPopup.types';
import styles from './Home.styles';

// 5FoL7bx9zzTqvJDocvJRrYwzvMHXaQJwwzjbHBNrE3Kf

// const opts: any = {
//   preflightCommitment: 'processed',
// };

// const programID = new PublicKey(env.farm_id);

const initialAlersState = {
  open: false,
  message: '',
  severity: undefined,
};

const Home: FC = () => {
  const [alertState, setAlertState] = useState<AlertState>(initialAlersState);
  const [isLoading, setIsLoading] = useState(false);
  const [farmerState, setFarmerState] = useState(null);
  const [stakedValue, setStakedValue] = useState(null);
  const [rewardValue, setRewardValue] = useState(null);
  const wallet = useWallet();

  console.log('wallet', wallet.connected);

  const onAlertClose = () => setAlertState(initialAlersState);

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
        <WalletFarmer />
        <Account />

        <Box sx={styles.rewards} component="section">
          <Reward rewardType="A" />
          <Reward rewardType="B" />
        </Box>

        {wallet.connected && (
          <Button
            title="Refresh Account"
            color={ButtonColor.white}
            customStyles={styles.refreshBtn}
            customVariant={ButtonVariant.outlined}
          />
        )}
      </PageContainer>

      <Loader isLoading={isLoading} />
      <NotificationPopup alertState={alertState} onAlertClose={onAlertClose} />
    </>
  );
};

export default Home;
