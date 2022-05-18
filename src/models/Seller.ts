import BaseModel from './BaseModel';
import SellerInterface from '../interfaces/SellerInterface';

export default class Seller extends BaseModel implements SellerInterface {
  public id!: string;
  public name!: string;
  public verified!: boolean;

  constructor(params: SellerInterface) {
    super();
    Object.assign(this, params);
  }
}