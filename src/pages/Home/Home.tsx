import { FC, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { initGemFarm } from 'common/utils/gemfarm';
import { INFT } from 'common/utils/getNfts';
import { populateVaultNFTs } from 'common/utils/getVaultNfts';
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

const NETWORK = 'https://api.devnet.solana.com';
const FARM_ID = 'DmE1UPAFY6UioMPpNf7BY1Ngy8UnCoEj4JismBhTUPyr';
const CONNECTION = new Connection(NETWORK, opts.preflightCommitment);

const initialAlersState = {
  open: false,
  message: '',
  severity: undefined,
};

const Home: FC = () => {
  const [alertState, setAlertState] = useState<AlertState>(initialAlersState);
  const [farmAddress, setfarmAddress] = useState<string | null>(null);
  const [farmAcc, setFarmAcc] = useState<any>(null);

  const [farmerAcc, setFarmerAcc] = useState<any>(null);
  const [farmerState, setFarmerState] = useState<string | null>(null);
  const [farmerIdentity, setFarmerIdentity] = useState<string | null>(null);

  const [availableA, setAvailableA] = useState<string>('');
  const [availableB, setAvailableB] = useState<string>('');
  const [selectedNFTs, setSelectedNFTs] = useState<INFT[]>([]);
  const wallet = useWallet();

  const onAlertClose = () => setAlertState(initialAlersState);

  const initFarmer = async (address: string) => {
    if (wallet && address) {
      const gf = await initGemFarm(CONNECTION, wallet);

      await gf.initFarmerWallet(new PublicKey(address));
      await fetchFarmer();
    }
  };

  const fetchFarn = async () => {
    const gf = await initGemFarm(CONNECTION, wallet);
    const pubKey = new PublicKey(FARM_ID);
    const fAcc = await gf.fetchFarmAcc(pubKey);

    setFarmAcc(fAcc);
  };

  const fetchFarmer = async () => {
    const gf: any = await initGemFarm(CONNECTION, wallet);
    const [farmerPDA] = await gf.findFarmerPDA(
      new PublicKey(FARM_ID),
      wallet.publicKey,
    );

    const fIdentity = wallet?.publicKey?.toBase58();
    const fAcc = await gf.fetchFarmerAcc(farmerPDA);
    const fState = gf.parseFarmerState(fAcc);

    console.log('fIdentity', fIdentity);
    console.log('fAcc', fAcc);
    console.log('fState', fState);

    fIdentity && setFarmerIdentity(fIdentity);
    setFarmerAcc(fAcc);
    setFarmerState(fState);

    await updateAvailableRewards();
  };

  const handleRefreshFarmer = async () => {
    const gf = await initGemFarm(CONNECTION, wallet);

    await gf.refreshFarmerWallet(
      new PublicKey(farmAddress!),
      new PublicKey(farmerIdentity!),
    );

    await fetchFarmer();
  };

  const beginStaking = async () => {
    const gf = await initGemFarm(CONNECTION, wallet);

    await gf.stakeWallet(new PublicKey(farmAddress!));
    await fetchFarmer();

    setSelectedNFTs([]);
  };

  const endStaking = async () => {
    const gf = await initGemFarm(CONNECTION, wallet);

    await gf.unstakeWallet(new PublicKey(farmAddress!));
    await fetchFarmer();

    setSelectedNFTs([]);
  };

  const claim = async () => {
    const gf = await initGemFarm(CONNECTION, wallet);

    await gf.claimWallet(
      new PublicKey(farmAddress!),
      new PublicKey(farmAcc.value.rewardA.rewardMint!),
      new PublicKey(farmAcc.value.rewardB.rewardMint!),
    );

    await fetchFarmer();
  };

  const updateAvailableRewards = async () => {
    const availA = farmerAcc.value.rewardA.accruedReward
      .sub(farmerAcc.value.rewardA.paidOutReward)
      .toString();

    const availB = farmerAcc.value.rewardB.accruedReward
      .sub(farmerAcc.value.rewardB.paidOutReward)
      .toString();

    setAvailableA(availA);
    setAvailableB(availB);
  };

  useEffect(() => {
    if (wallet.connected) {
      setAlertState({
        open: true,
        message: 'Wallet connected',
        severity: 'success',
      });
    }
  }, [wallet]);

  useEffect(() => {
    const freshStart = async () => {
      if (wallet && CONNECTION) {
        const farmIdent = wallet?.publicKey?.toBase58();

        farmIdent && setFarmerIdentity(farmIdent);

        try {
          await fetchFarn();
          await fetchFarmer();
        } catch (e) {
          console.log(`farm with PK ${farmAddress} not found :(`);
        }
      }
    };

    freshStart();
  }, []);

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
