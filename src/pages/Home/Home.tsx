import { FC, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
import { Connection, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { SignerWalletAdapter } from '@solana/wallet-adapter-base';
import { initGemFarm } from 'common/utils/gemFarm';
import { INFT } from 'common/utils/getNFT';
import { stringifyPKsAndBNs } from '@gemworks/gem-farm-ts';
import { AppBasement, AppWrapper } from 'common/layout';
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
  ButtonType,
} from 'common/components/Button/Button.types';
import { AlertState } from 'common/components/NotificationPopup/NotificationPopup.types';
import styles from './Home.styles';

const opts: any = {
  preflightCommitment: 'processed',
};

const NETWORK =
  process.env.REACT_APP_NETWORK || 'https://api.devnet.solana.com';

const FARM_ID =
  process.env.REACT_APP_FARM_ID ||
  '8EV1K3kWmq2hbRtQfnBg3wbvELEorJajbyJhRGwVptwj';

const CONNECTION = new Connection(NETWORK, opts.preflightCommitment);

const initialAlertState = {
  open: false,
  message: '',
  severity: undefined,
};

const Home: FC = () => {
  const [alertState, setAlertState] = useState<AlertState>(initialAlertState);
  const [farm, setFarm] = useState<string>('');
  const [farmAcc, setFarmAcc] = useState<any>(null);

  const [farmerIdentity, setFarmerIdentity] = useState<string | null>(null);
  const [farmerAcc, setFarmerAcc] = useState<any>(null);
  const [farmerState, setFarmerState] = useState<string | null>(null);

  const [selectedNFTs, setSelectedNFTs] = useState<INFT[]>([]);
  const [availableA, setAvailableA] = useState<string>('');
  const [availableB, setAvailableB] = useState<string>('');
  const wallet = useWallet();

  const onAlertClose = () => setAlertState(initialAlertState);

  const updateAvailableRewards = async () => {
    const availableA = farmerAcc.value.rewardA.accruedReward
      .sub(farmerAcc.value.rewardA.paidOutReward)
      .toString();
    const availableB = farmerAcc.value.rewardB.accruedReward
      .sub(farmerAcc.value.rewardB.paidOutReward)
      .toString();

    if (availableA) setAvailableA(availableA);
    if (availableB) setAvailableB(availableB);
  };

  // useEffect(() => {
  //   console.log('_____________________');
  //   console.log('farm', farm);
  //   console.log('farmAcc', farmAcc);
  //   console.log('farmerIdentity', farmerIdentity);
  //   console.log('farmerAcc', farmerAcc);
  //   console.log('farmerState', farmerState);
  //   console.log('selectedNFTs', selectedNFTs);
  //   console.log('availableA', availableA);
  //   console.log('availableB', availableB);
  //   console.log('_____________________');
  // }, [
  //   farm,
  //   farmAcc,
  //   farmerIdentity,
  //   farmerAcc,
  //   farmerState,
  //   selectedNFTs,
  //   availableA,
  //   availableB,
  // ]);

  const fetchFarn = async () => {
    const gf = await initGemFarm(CONNECTION, wallet as any);
    const pubKey = new PublicKey(FARM_ID);
    const fAcc: any = await gf.fetchFarmAcc(pubKey);

    if (fAcc) setFarm(fAcc);

    console.log(`farm found at ${FARM_ID}:`, stringifyPKsAndBNs(fAcc));
  };

  const fetchFarmer = async () => {
    const gf: any = await initGemFarm(CONNECTION, wallet as any);

    const [farmerPDA] = await gf.findFarmerPDA(
      new PublicKey(FARM_ID),
      wallet.publicKey,
    );

    const fIdentity = wallet.publicKey?.toBase58() as any;
    const fAcc = await gf.fetchFarmerAcc(farmerPDA);
    const fState = gf.parseFarmerState(farmerAcc);

    if (fIdentity) setFarmerIdentity(fIdentity);
    if (fAcc) setFarmerAcc(fAcc);
    if (fState) setFarmerState(fState);

    console.log('farmerAcc :>>>>>>>>>> ', farmerAcc);

    await updateAvailableRewards();

    console.log(
      `farmer found at ${farmerIdentity}:`,
      stringifyPKsAndBNs(farmerAcc),
    );
  };

  const initFarmer = async (farm: string) => {
    const gf: any = await initGemFarm(CONNECTION, wallet as any);

    if (farm) setFarm(farm);

    await gf.initFarmerWallet(new PublicKey(farm || FARM_ID));
    await fetchFarmer();
  };

  // --------------------------------------- staking
  const beginStaking = async () => {
    const gf: any = await initGemFarm(CONNECTION, wallet as any);

    await gf.stakeWallet(new PublicKey(FARM_ID));
    await fetchFarmer();

    setSelectedNFTs([]);
  };

  const endStaking = async () => {
    const gf: any = await initGemFarm(CONNECTION, wallet! as any);

    await gf.unstakeWallet(new PublicKey(FARM_ID));
    await fetchFarmer();

    setSelectedNFTs([]);
  };

  const claim = async () => {
    const gf: any = await initGemFarm(CONNECTION, wallet as any);

    await gf.claimWallet(
      new PublicKey(FARM_ID),
      new PublicKey(farmAcc.rewardA.rewardMint),
      new PublicKey(farmAcc.rewardB.rewardMint),
    );

    await fetchFarmer();
  };

  const handleRefreshFarmer = async () => {
    await fetchFarmer();
  };

  // --------------------------------------- adding extra gem

  const handleNewSelectedNFT = (newSelectedNFTs: INFT[]) => {
    console.log(`selected ${newSelectedNFTs.length} NFTs`);

    setSelectedNFTs(newSelectedNFTs);
  };

  const addSingleGem = async (
    gemMint: PublicKey,
    gemSource: PublicKey,
    creator: PublicKey,
  ) => {
    const gf: any = await initGemFarm(CONNECTION, wallet! as any);

    await gf.flashDepositWallet(
      new PublicKey(FARM_ID),
      '1',
      gemMint,
      gemSource,
      creator,
    );

    await fetchFarmer();
  };

  const addGems = async () => {
    await Promise.all(
      selectedNFTs.map(nft => {
        const creator = new PublicKey(
          //todo currently simply taking the 1st creator
          (nft.onchainMetadata as any).data.creators[0].address,
        );
        console.log('creator is', creator.toBase58());

        addSingleGem(nft.mint, nft.pubkey!, creator);
      }),
    );
    console.log(`added another ${selectedNFTs.length} gems into staking vault`);
  };

  useEffect(() => {
    const freshStart = async () => {
      const gf: any = await initGemFarm(CONNECTION, wallet as any);
      const fIdentity = wallet.publicKey?.toBase58();

      //reset stuff
      setFarmAcc(null);
      setFarmerAcc(null);
      setFarmerState(null);
      setAvailableA('');
      setAvailableB('');

      try {
        await fetchFarn();
        await fetchFarmer();
      } catch (e) {
        console.log(`farm with PK ${farm} not found :(`);
      }
    };

    if (wallet && CONNECTION) freshStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

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
        setfarmAddress={setFarm}
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
