import BuyerInterface from './BuyerInterface';
import { CompetitionConstants } from '../constants/CompetitionConstants';
import BidsInterface from './BidsInterface';

export default interface CompetitionInterface {
  id: string;
  buyer: string | null;
  name: string;
  open: Date | string;
  closed: Date |string | null;
  minimum_capacity: number;
  currency: string;
  // has one
  theBuyer: BuyerInterface | null;
  // accessors
  status: CompetitionConstants;
  successfulBids: Array<BidsInterface>;
  successRate: number | string;
}

export interface ClosedCompetitionInterface extends CompetitionInterface {
  totalSuccessfulBids?: number;
  bidVolume?: number;
}
