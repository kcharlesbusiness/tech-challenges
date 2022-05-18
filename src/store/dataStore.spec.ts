import { createPinia, setActivePinia } from 'pinia';
import { useDataStore } from './dataStore';
import { getBidsList, getBuyerList, getCompetitionList, getSellerList} from '../services/dataService';
import Bid from '../models/Bid';
import { DataTypeConstants } from '../constants/DataTypeConstants';
import Buyer from '../models/Buyer';
import Competition from '../models/Competition';
import Seller from '../models/Seller';
import BidsInterface from '../interfaces/BidsInterface';
import {ClosedCompetitionInterface} from "../interfaces/CompetitionInterface";
import {CompetitionConstants} from "../constants/CompetitionConstants";
import {TopBuyerInterface} from "../interfaces/BuyerInterface";
import {vi} from "vitest";

describe('STORE - dataStore', () => {
  let dataStore: any;
  beforeEach(() => {
    setActivePinia(createPinia());
    dataStore = useDataStore();
  });

  describe('STATE', () => {
    it('has correct default data', () => {
       expect(dataStore.bids).toEqual([]);
       expect(dataStore.buyers).toEqual([]);
       expect(dataStore.competitions).toEqual([]);
       expect(dataStore.sellers).toEqual([]);
    });
  });

  describe('ACTIONS', () => {
    describe('ACTION - hydrateStore', () => {
      it('returns empty array before store is hydrated', () => {
        expect(dataStore.bids?.length).toEqual(0);
        expect(dataStore.buyers?.length).toEqual(0);
        expect(dataStore.competitions?.length).toEqual(0);
        expect(dataStore.sellers?.length).toEqual(0);
      });
      it('hydrates store with correct data', () => {
        dataStore.hydrateStore();

        expect(dataStore.bids?.length).toEqual(getBidsList().length);
        expect(dataStore.buyers?.length).toEqual(getBuyerList().length);
        expect(dataStore.competitions?.length).toEqual(getCompetitionList().length);
        expect(dataStore.sellers?.length).toEqual(getSellerList().length);
      });
    });

    describe('ACTION - findById', () => {
      it('returns empty array before store is hydrated', () => {
        expect(dataStore.findById(DataTypeConstants.BID, getBidsList()[0].id)).toEqual(null);
      });
      it('returns correct data record', () => {
        const BidModel: Bid = new Bid(getBidsList()[0]);

        dataStore.hydrateStore();

        expect(dataStore.findById(DataTypeConstants.BID, getBidsList()[0].id)).toEqual(BidModel);
      });
    });

    describe('ACTION - findBidById', () => {
      it('returns empty array before store is hydrated', () => {
        expect(dataStore.findBidById(getBidsList()[0].id)).toEqual(null);
      });
      it('returns correct data record', () => {
        const BidModel: Bid = new Bid(getBidsList()[0]);

        dataStore.hydrateStore();

        expect(dataStore.findBidById(getBidsList()[0].id)).toEqual(BidModel);
      });
    });

    describe('ACTION - findBuyerById', () => {
      it('returns empty array before store is hydrated', () => {
        expect(dataStore.findBuyerById(getBuyerList()[0].id)).toEqual(null);
      });
      it('returns correct data record', () => {
        const BuyerModel: Buyer = new Buyer(getBuyerList()[0]);

        dataStore.hydrateStore();

        expect(dataStore.findBuyerById(getBuyerList()[0].id)).toEqual(BuyerModel);
      });
    });

    describe('ACTION - findCompetitionById', () => {
      it('returns empty array before store is hydrated', () => {
        expect(dataStore.findCompetitionById(getCompetitionList()[0].id)).toEqual(null);
      });
      it('returns correct data record', () => {
        const CompetitionModel: Competition = new Competition(getCompetitionList()[0]);

        dataStore.hydrateStore();

        expect(dataStore.findCompetitionById(getCompetitionList()[0].id)).toEqual(CompetitionModel);
      });
    });

    describe('ACTION - findSellerById', () => {
      it('returns empty array before store is hydrated', () => {
        expect(dataStore.findSellerById(getSellerList()[0].id)).toEqual(null);
      });
      it('returns correct data record', () => {
        const SellerModel: Seller = new Seller(getSellerList()[0]);

        dataStore.hydrateStore();

        expect(dataStore.findSellerById(getSellerList()[0].id)).toEqual(SellerModel);
      });
    });

    describe('ACTION - filterBy', () => {
      it('returns empty array before store is hydrated', () => {
        const callBack = vi.fn().mockReturnValue((item: BidsInterface) => item.value >= 100);
        expect(dataStore.filterBy(DataTypeConstants.BID, callBack)).toEqual([]);
      });
      it('returns bids filtered by value that\'s greater than 100', () => {
        const callBack = vi.fn().mockReturnValue((item: BidsInterface) => item.value >= 100);
        expect(dataStore.filterBy(DataTypeConstants.BID, callBack)).toEqual([]);

        dataStore.hydrateStore();

        const fn: Array<BidsInterface> = dataStore.filterBy(DataTypeConstants.BID, (item: BidsInterface) => {
          return item.value >= 100;
        });

        expect(dataStore.bids.length > fn.length).toBeTruthy();
        expect(fn.length).toBeGreaterThan(0);
        fn.forEach((item: BidsInterface) => expect(item.value).toBeGreaterThanOrEqual(100));
      });
    });
  });

  describe('GETTERS', () => {
    describe('GETTER - getSuccessfulBids', () => {
      it('returns empty array before store is hydrated', () => {
        expect(dataStore.getSuccessfulBids).toEqual([]);
      });
      it('returns bids with isSuccessful returning true', () => {
        dataStore.hydrateStore();
        const fn: Array<BidsInterface> = dataStore.getSuccessfulBids;

        expect(dataStore.bids.length > fn.length).toBeTruthy();
        expect(fn.length).toBeGreaterThan(0);
        fn.forEach((item: BidsInterface) => expect(item.isSuccessful).toBeTruthy());
      });
    });

    describe('GETTER - getClosedCompetitions', () => {
      it('returns empty array before store is hydrated', () => {
        expect(dataStore.getClosedCompetitions).toEqual([]);
      });
      it('return competitions with the status equalling "closed"', () => {
        dataStore.hydrateStore();
        const fn: Array<ClosedCompetitionInterface> = dataStore.getClosedCompetitions;

        expect(fn.length).toBeGreaterThan(0);
        fn.forEach((item: ClosedCompetitionInterface) => expect(item.status).toEqual(CompetitionConstants.CLOSED))
      });
    });

    describe('GETTER - getTopBuyers', () => {
      it('returns empty array before store is hydrated', () => {
        expect(dataStore.getTopBuyers).toEqual([]);
      });
      it('returns top 10 buyers and is ordered by "totalBoughtCompetitions"', () => {
        dataStore.hydrateStore();
        const fn: Array<TopBuyerInterface> = dataStore.getTopBuyers;

        expect(fn.length).toEqual(10);
        for (let i: number = 1; i < fn.length; i++) {
          expect(fn[i - 1].totalBoughtCompetitions >= fn[i].totalBoughtCompetitions).toBeTruthy();
        }
      });
    });
  });
});
