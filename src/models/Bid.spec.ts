import { vi, SpyInstance } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import type BidsInterface from '../interfaces/BidsInterface';
import Bid from './Bid';
import { getBidsList } from '../services/dataService';
import { useDataStore } from '../store/dataStore';
import SellerInterface from '../interfaces/SellerInterface';
import CompetitionInterface from '../interfaces/CompetitionInterface';

describe('MODEL - Bid', () => {
  const bids: Array<BidsInterface> = getBidsList();
  it('has correct properties', () => {
    bids.forEach((bid: BidsInterface) => {
      const BidModel: Bid = new Bid({
        id: bid.id,
        created: bid.created,
        accepted: bid.accepted,
        competition: bid.competition,
        seller: bid.seller,
        value: bid.value,
        offered_capacity: bid.offered_capacity,
      } as BidsInterface);

      expect(typeof BidModel.id).toBe('string');
      expect(typeof BidModel.created).toBe('string');
      expect(typeof BidModel.accepted).toBe(BidModel.accepted === null ? 'object' : 'boolean'); // null is typeof 'object'
      expect(typeof BidModel.competition).toBe('string');
      expect(typeof BidModel.seller).toBe('string');
      expect(typeof BidModel.value).toBe('number');
      expect(typeof BidModel.offered_capacity).toBe('number');
    });
  });

  describe('Relationships', () => {
    const BidModel: Bid = new Bid(bids[0]);
    let dataStore: any;
    beforeEach(() => {
      setActivePinia(createPinia());
      dataStore = useDataStore();
      dataStore.hydrateStore();
    });

    it('seller', () => {
      const correctSeller: SellerInterface = dataStore.findSellerById(BidModel.seller);

      expect(BidModel.theSeller).not.toBeNull();
      expect(BidModel.theSeller?.id).toBe(correctSeller.id);
    });

    it('competition', () => {
      const correctCompetition: CompetitionInterface = dataStore.findCompetitionById(BidModel.competition);

      expect(BidModel.theCompetition).not.toBeNull();
      expect(BidModel.theCompetition?.id).toBe(correctCompetition.id);
    });
  });

  describe('Accessors', () => {
    const BidModel: Bid = new Bid(bids[0]);
    let dataStore: any;
    beforeEach(() => {
      setActivePinia(createPinia());
      dataStore = useDataStore();
      dataStore.hydrateStore();
    });

    it('isSuccessful', () => {
      const spyTheCompetition: SpyInstance = vi.spyOn(BidModel, 'theCompetition', 'get');
      const spyTheSeller: SpyInstance = vi.spyOn(BidModel, 'theSeller', 'get');

      expect(typeof BidModel.isSuccessful).toBe('boolean');
      expect(spyTheCompetition).toBeCalled();
      expect(spyTheSeller).toBeCalled();
    });
  });
});
