export default interface BuyerInterface {
  id: string;
  name: string;
}

export interface TopBuyerInterface extends BuyerInterface {
  totalBoughtCompetitions: number;
}
