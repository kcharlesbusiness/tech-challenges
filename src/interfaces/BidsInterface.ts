import { Ref } from 'vue';
import CompetitionInterface from './CompetitionInterface';
import SellerInterface from "./SellerInterface";

export default interface BidsInterface {
  id: string;
  created: Date | string; // 'createdAt' would be more intuitive
  accepted: boolean | null;
  competition: string; // Should be competition_id to allow for relationships to be returned under the name 'competition'
  seller: string; // should be named seller_id, to allow for relationships to be returned under the name 'seller'
  value: number;
  offered_capacity: number;
  // has one
  theSeller: SellerInterface | null;
  theCompetition: CompetitionInterface | null;
  // accessors
  isSuccessful: boolean;
}
