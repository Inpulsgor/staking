export interface AppBasementProps {
  initFarmer: (address: string) => void;
  setfarmAddress: (address: string) => void;
  beginStaking: () => void;
  availableA: string;
  availableB: string;
  farmerAcc: Record<string, any>;
}
