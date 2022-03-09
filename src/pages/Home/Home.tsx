import { FC, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { stringifyPKsAndBNs } from '@gemworks/gem-farm-ts';
import {
  fetchFarn,
  fetchFarmer,
  stakerMover,
  stakerMoreMover,
} from 'common/utils/staker';
import { superUnstakeMover } from 'common/utils/unstaker';
import { initGemFarm } from 'common/utils/gemfarm';
import { claim } from 'common/utils/claimer';
import {
  INFT,
  getNFTsByOwner,
  getNFTMetadataForMany,
} from 'common/utils/getNfts';
import { populateVaultNFTs } from 'common/utils/getVaultNfts';
import { AppBasement, AppWrapper, PageContainer } from 'common/layout';
import { AlertState } from 'common/components/NotificationPopup/NotificationPopup.types';
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
  ButtonType,
} from 'common/components/Button/Button.types';
import styles from './Home.styles';

const opts: Record<string, any> = {
  preflightCommitment: 'processed',
};

const NETWORK: any = process.env.REACT_APP_NETWORK;
const FARM_ID: any = process.env.REACT_APP_FARM_ID;
const CONNECTION = new Connection(NETWORK, opts.preflightCommitment);

const initialAlertState = {
  open: false,
  message: '',
  severity: undefined,
};

const Home: FC = () => {
  const [alertState, setAlertState] = useState<AlertState>(initialAlertState);
  const [farmAddress, setfarmAddress] = useState<string | null>(null);
  const [farmerState, setFarmerState] = useState<string | null>(null);
  const [stakedValue, setStakedValue] = useState<INFT[]>([]);
  const [rewardA, setRewardA] = useState<string | null>(null);
  const [rewardB, setRewardB] = useState<string | null>(null);
  const [value, setValue] = useState<INFT[]>([]);
  const wallet = useWallet();

  const onAlertClose = () => setAlertState(initialAlertState);

  const getProvider = async () => {
    const provider = new Provider(
      CONNECTION,
      wallet as any,
      opts.preflightCommitment,
    );

    return provider;
  };

  const claimRewards = async () => {
    const farm: any = await fetchFarn(CONNECTION, wallet);
    const claimResults = await claim(farm, CONNECTION, wallet as any);

    return claimResults;
  };

  const getRewardA = async () => {
    const { farmerAcc } = (await fetchFarmer(CONNECTION, wallet)) as any;
    const diff =
      farmerAcc.rewardA.accruedReward - farmerAcc.rewardA.paidOutReward;

    console.log('reward amount: ', diff.toString());

    const rewardA = diff.toString();
    setRewardA(rewardA);
  };

  const getRewardB = async () => {
    const { farmerAcc } = (await fetchFarmer(CONNECTION, wallet)) as any;
    const diff =
      farmerAcc.rewardB.accruedReward - farmerAcc.rewardB.paidOutReward;

    console.log('reward amount: ', diff.toString());

    const rewardB = diff.toString();
    setRewardB(rewardB);
  };

  const getUnstakedNfts = async () => {
    const provider = await getProvider();
    const connection = new Connection(NETWORK, opts.preflightCommitment);
    const providerPublicKey = new PublicKey(provider.wallet.publicKey);
    const nfts = await getNFTsByOwner(providerPublicKey, connection);
    const nftdata = await getNFTMetadataForMany(nfts, connection);

    for (let nft of nfts) {
      console.log(nft);
      // console.log(nft.onchainMetadata.data.name);
    }

    setValue(nftdata);
  };

  const getStakedNfts = async () => {
    const farmStarted = await fetchFarn(CONNECTION, wallet);
    console.log('started: ', farmStarted);

    const farmerStarted = await fetchFarmer(CONNECTION, wallet);
    console.log('started: ', farmerStarted);

    const gdrs = await populateVaultNFTs(CONNECTION, wallet);

    setFarmerState(farmerStarted.farmerState);
    gdrs && setStakedValue(gdrs);
  };

  const refreshAll = async () => {
    await getUnstakedNfts();
    await getStakedNfts();
    await getRewardA();
    await getRewardB();
  };

  const stakeNft = async (nft: INFT) => {
    // console.log('staking nft', nft?.onchainMetadata.mint);

    const stakeResult = await stakerMover(nft, CONNECTION, wallet);
    console.log('stakeResult', stakeResult);

    const farmerStarted = await fetchFarmer(CONNECTION, wallet);
    setFarmerState(farmerStarted.farmerState);

    await refreshAll();
  };

  const stakeMoreNfts = async (nft: INFT) => {
    // console.log('staking additional nft', nft.onchainMetadata.mint);
    const stakeResult = await stakerMoreMover(nft, CONNECTION, wallet);
    console.log(stakeResult);

    const farmerStarted = await fetchFarmer(CONNECTION, wallet);
    setFarmerState(farmerStarted.farmerState);

    await refreshAll();
  };

  async function withdrawStake(nfts) {
    const endStakeResults = await superUnstakeMover(nfts, CONNECTION, wallet);
    console.log(endStakeResults);

    await refreshAll();
  }

  return (
    <>
      <Helmet>
        <title>Stacking</title>
        <meta name="description" content="Stacking" />
      </Helmet>

      <AppWrapper>
        <PageContainer>
          <WalletFarmer />
          <Account farmAcc={farmAcc} farmerAcc={farmerAcc} />

          <Box sx={styles.rewards} component="section">
            <Reward
              rewardType="A"
              farmReward={farmAcc?.rewardA}
              reward={farmerAcc?.rewardA}
            />
            <Reward
              rewardType="B"
              farmReward={farmAcc?.rewardB}
              reward={farmerAcc?.rewardB}
            />
          </Box>

          <Button
            title="Refresh Account"
            buttonType={ButtonType.button}
            color={ButtonColor.white}
            customStyles={styles.refreshBtn}
            customVariant={ButtonVariant.outlined}
            handleClick={handleRefreshFarmer}
          />
        </PageContainer>
      </AppWrapper>

      <AppBasement
        farmerAcc={farmerAcc}
        initFarmer={initFarmer}
        setfarmAddress={setfarmAddress}
        beginStaking={beginStaking}
        availableA={availableA}
        availableB={availableB}
      />

      <Loader isLoading={wallet.connecting} />
      <NotificationPopup alertState={alertState} onAlertClose={onAlertClose} />
    </>
  );
};

export default Home;
