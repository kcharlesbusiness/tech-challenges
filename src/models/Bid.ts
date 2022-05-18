import { Ref, ref } from 'vue';
import { useDataStore } from '../store/dataStore';
import BidsInterface from '../interfaces/BidsInterface';
import CompetitionInterface from '../interfaces/CompetitionInterface';
import SellerInterface from '../interfaces/SellerInterface';
import BaseModel from './BaseModel';
import dayjs from "dayjs";

export default class Bid extends BaseModel implements BidsInterface {
  public id!: string;
  public created!: Date | string;
  public accepted!: boolean;
  public competition!: string;
  public seller!: string;
  public value!: number;
  public offered_capacity!: number;

  constructor(params: BidsInterface) {
    super();
    Object.assign(this, params);
  }

  get theSeller(): SellerInterface | null {
    return useDataStore().findSellerById(this.seller) as SellerInterface || null;
  }

  get theCompetition(): CompetitionInterface | null {
    return useDataStore().findCompetitionById(this.competition) as CompetitionInterface || null;
  }

  get isSuccessful(): boolean {
    if (this.theCompetition?.minimum_capacity && this.theSeller?.verified) {
      return this.offered_capacity >= this.theCompetition.minimum_capacity &&
        this.accepted &&
        this.theSeller.verified &&
        (
          dayjs(this.created).isAfter(dayjs(this.theCompetition.open)) &&
          dayjs(this.created).isBefore(dayjs(this.theCompetition.closed))
        )
    }

    return false;
  }
}
