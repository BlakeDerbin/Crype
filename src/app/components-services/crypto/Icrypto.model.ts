export default class Icrypto {
  id: number;
  name: string;
  symbol: string;
  //rank: number;
  //price_usd: number;
  //price_btc: number;
  //day_volume_usd: number;
  //market_cap_usd: number;
  //available_supply: number;
  //total_supply: number;
  //max_supply: number;
  //percent_change_1h: number;
  //percent_change_24h: number;
  //last_updated: string;
  price: Iprice[];

}

export interface Iprice {
  current_price: number;
  day_price: number;
}
