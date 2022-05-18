import BuyerInterface from '../interfaces/BuyerInterface';
import BaseModel from './BaseModel';

export default class Buyer extends BaseModel implements BuyerInterface {
  public id!: string;
  public name!: string;

  constructor(params: BuyerInterface) {
    super();
    Object.assign(this, params);
  }
}