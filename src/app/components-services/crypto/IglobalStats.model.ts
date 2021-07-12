export default class IglobalStats {
  active_cryptocurrencies: number;
  market_cap_change_percentage_24h_usd: number;
  market_cap_percentage: {
    bnb: number;
    btc: number;
    eth: number;
  }
  markets: number;
  total_market_cap: {
    usd: number;
    aud: number;
    cad: number;
    nzd: number;
  }
  total_volume: {
    usd: number;
    aud: number;
    cad: number;
    nzd: number;
  }
  updated_at: number;
}
