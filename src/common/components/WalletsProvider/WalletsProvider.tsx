import { FC } from 'react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';
import {
  WalletProvider,
  ConnectionProvider,
} from '@solana/wallet-adapter-react';
require('@solana/wallet-adapter-react-ui/styles.css');

const endpoint = 'https://api.devnet.solana.com';
const wallets = [
  new PhantomWalletAdapter(),
]; /* wallets list https://github.com/solana-labs/wallet-adapter#wallets */

const WalletsProvider: FC = ({ children }) => {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider>{children}</WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletsProvider;
