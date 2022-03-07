export interface ConnectFarmProps {
  setfarmAddress: (address: string) => void;
  initFarmer: (address: string) => void;
}

export interface DefaultValues {
  [key: string]: string;
}
