export default class IcryptoDetails {
  id: string;
  symbol: string;
  name: string;
  description: any;
  image: any;
  market_data: {
    ath: {
      usd: number;
      aud: number;
    }
  }
}
