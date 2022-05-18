import {defineStore, StoreDefinition} from 'pinia';
import { DataTypeConstants } from '../constants/DataTypeConstants';
import BidsInterface from "../interfaces/BidsInterface";
import BuyerInterface, { TopBuyerInterface } from '../interfaces/BuyerInterface';
import CompetitionInterface, { ClosedCompetitionInterface } from '../interfaces/CompetitionInterface';
import SellerInterface from '../interfaces/SellerInterface';
import { getBidsList, getBuyerList, getCompetitionList, getSellerList } from '../services/dataService';
import Bid from '../models/Bid';
import Buyer from '../models/Buyer';
import Competition from '../models/Competition';
import { Ref } from 'vue';
import Seller from '../models/Seller';
import { CompetitionConstants } from '../constants/CompetitionConstants';

export type DataState = {
  bids: Array<BidsInterface>;
  buyers: Array<BuyerInterface>;
  competitions: Array<CompetitionInterface>;
  sellers: Array<SellerInterface>;
}

export const useDataStore = defineStore({
  id: 'dataStore',
  state: () => ({
    bids: [],
    buyers: [],
    competitions: [],
    sellers: [],
  }) as unknown as DataState,

  actions: {
    hydrateStore() {
      // @ts-ignore
      this.bids = getBidsList().map((item: BidsInterface) => {
        return new Bid(item);
      }) as Array<BidsInterface>;

      this.buyers = getBuyerList().map((item: BuyerInterface) => {
        return new Buyer(item);
      }) as Array<BuyerInterface>;

      // @ts-ignore
      this.competitions = getCompetitionList().map((item: CompetitionInterface) => {
        return new Competition(item);
      }) as Array<CompetitionInterface>;

      this.sellers = getSellerList().map((item: SellerInterface) => {
        return new Seller(item);
      }) as Array<SellerInterface>;
    },
    findById<T extends { id: string }>(type: DataTypeConstants, id: string): T | null {
      const matched: Array<T> = (this[`${type}s`] as Array<T>)
        .filter((item: T) => item.id === id) ?? null;

      return matched?.length ? matched[0] as T : null;
    },
    findBidById(id: string): BidsInterface | null {
      return this.findById<BidsInterface>(DataTypeConstants.BID, id) as unknown as BidsInterface;
    },
    findBuyerById(id: string): BuyerInterface | null {
      return this.findById(DataTypeConstants.BUYER, id) as unknown as BuyerInterface;
    },
    findCompetitionById(id: string): CompetitionInterface | null {
      return this.findById(DataTypeConstants.COMPETITION, id) as unknown as CompetitionInterface;
    },
    findSellerById(id: string): SellerInterface | null {
      return this.findById(DataTypeConstants.SELLER, id) as unknown as SellerInterface;
    },
    filterBy<T extends {}>(type: DataTypeConstants, callback: (item: T) => boolean): Array<T> {
      return (this[`${type}s`] as Array<T>).filter((item: T) => callback(item as T)) ?? null;
    },
  },

  getters: {
    getSuccessfulBids: (state: DataState): Array<BidsInterface> => {
      return state.bids.filter((bid: BidsInterface) => {
        return bid.isSuccessful;
      });
    },
    getClosedCompetitions: (state: DataState): Array<ClosedCompetitionInterface> => {
      let query: Array<ClosedCompetitionInterface> = state.competitions.filter((competition: CompetitionInterface) => {
        return competition.status === CompetitionConstants.CLOSED;
      });

      query = query.map((competition: CompetitionInterface) => {
        return Object.assign(competition, {
          buyerName: competition.theBuyer?.name ?? '',
          totalSuccessfulBids: competition.successfulBids.length,
          bidVolume: competition.successfulBids.reduce((previous: number, bid: BidsInterface) => previous += bid.offered_capacity, 0)
        });
      });

      return query;
    },
    getTopBuyers: (state: DataState): Array<TopBuyerInterface> => {
      return state.buyers.map((buyer: BuyerInterface) => {
        return {
          ...buyer,
          totalBoughtCompetitions: state.competitions
            .filter((competition: CompetitionInterface) => competition?.theBuyer?.id === buyer.id)
            .length
        };
      })
        .sort((a: TopBuyerInterface, b: TopBuyerInterface) => a.totalBoughtCompetitions - b.totalBoughtCompetitions)
        .slice(0, 10)
        .reverse();
    },
  },
});
