import CompetitionInterface from "../interfaces/CompetitionInterface";
import BuyerInterface from "../interfaces/BuyerInterface";
import BaseModel from './BaseModel';
import {useDataStore} from '../store/dataStore';
import dayjs from 'dayjs';
import {CompetitionConstants} from '../constants/CompetitionConstants';
import BidsInterface from '../interfaces/BidsInterface';
import {DataTypeConstants} from '../constants/DataTypeConstants';

export default class Competition extends BaseModel implements CompetitionInterface {
  public id!: string;
  public buyer!: string;
  public name!: string;
  public open!: Date | string;
  public closed!: Date | string;
  public minimum_capacity!: number;
  public currency!: string;

  constructor(params: CompetitionInterface) {
    super();
    Object.assign(this, params);
  }

  get theBuyer(): BuyerInterface | null {
    return useDataStore().findBuyerById(this.buyer) as BuyerInterface ?? null;
  }

  get status(): CompetitionConstants {
    switch (true) {
      case dayjs().isBefore(dayjs(this.open)):
        return CompetitionConstants.PENDING;
      case (dayjs().isAfter(dayjs(this.open)) || dayjs().isSame(dayjs(this.open))) && dayjs().isBefore(dayjs(this.closed)):
        return CompetitionConstants.OPEN;
      case dayjs().isAfter(dayjs(this.closed)):
        return CompetitionConstants.CLOSED;
      default:
        return CompetitionConstants.ERROR;
    }
  }

  get successfulBids(): Array<BidsInterface> {
    return useDataStore().filterBy<BidsInterface>(DataTypeConstants.BID, (item: BidsInterface) => {
      return item.competition === this.id && item.isSuccessful;
    }) as Array<BidsInterface>;
  }

  get successRate(): number | string {
    const successfulBids: Array<BidsInterface> = this.successfulBids;
    const failedBids: Array<BidsInterface> = useDataStore()
      .filterBy<BidsInterface>(DataTypeConstants.BID, (item: BidsInterface) => {
        return item.competition === this.id && !item.isSuccessful;
      });
    const totalBids: number = successfulBids.length + failedBids.length;

    return ((successfulBids.length / totalBids) * 100).toFixed(2);
  }
}