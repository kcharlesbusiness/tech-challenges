// data
import staticBidsData from '../../data/bids.json';
import staticBuyerData from '../../data/buyers.json';
import staticCompetitionData from '../../data/competitions.json';
import staticSellerData from '../../data/sellers.json';
// interfaces
import BidsInterface from '../interfaces/BidsInterface';
import BuyerInterface from "../interfaces/BuyerInterface";
import CompetitionInterface from "../interfaces/CompetitionInterface";
import SellerInterface from "../interfaces/SellerInterface";

/**
 * Bids
 */
const stringifyBidsList: string = JSON.stringify(staticBidsData);
export function getBidsList(): Array<BidsInterface> {
  return [...JSON.parse(stringifyBidsList)];
}
export function filterBidsBy(
  key: keyof BidsInterface,
  value: (bidItem: BidsInterface) => Array<BidsInterface> | BidsInterface[typeof key]
): Array<BidsInterface> {
  if (typeof value === 'function') {
    return [...JSON.parse(stringifyBidsList).filter((bidItem: BidsInterface) => value(bidItem))];
  }
  return [...JSON.parse(stringifyBidsList).filter((bidItem: BidsInterface) => bidItem[key] === value)];
}

/**
 * Buyers
 */
const stringifyBuyerList: string = JSON.stringify(staticBuyerData);
export function getBuyerList(): Array<BuyerInterface> {
  return [...JSON.parse(stringifyBuyerList)];
}
export function filterBuyerBy(
  key: keyof BuyerInterface,
  value: BuyerInterface[typeof key]
): Array<BuyerInterface> {
  return [...JSON.parse(stringifyBidsList).filter((bidItem: BuyerInterface) => bidItem[key] === value)];
}

/**
 * Competitions
 */
const stringifyCompetitionList: string = JSON.stringify(staticCompetitionData);
export function getCompetitionList(): Array<CompetitionInterface> {
  return [...JSON.parse(stringifyCompetitionList)];
}
export function filterCompetitionBy(
  key: keyof CompetitionInterface,
  value: CompetitionInterface[typeof key]
): Array<CompetitionInterface> {
  return [...JSON.parse(stringifyBidsList).filter((bidItem: CompetitionInterface) => bidItem[key] === value)];
}

/**
 * Sellers
 */
const stringifySellerList: string = JSON.stringify(staticSellerData);
export function getSellerList(): Array<SellerInterface> {
  return [...JSON.parse(stringifySellerList)];
}
export function filterSellerBy(
  key: keyof SellerInterface,
  value: SellerInterface[typeof key]
): Array<SellerInterface> {
  return [...JSON.parse(stringifyBidsList).filter((bidItem: SellerInterface) => bidItem[key] === value)];
}
