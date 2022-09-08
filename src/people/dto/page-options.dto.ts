import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from '../../interface/order';

export class PageOptionsDto {
  private readonly order: Order;
  private readonly page: number;
  private readonly take: number;

  constructor(pagination: any) {
    this.order = Order.DESC;
    this.page = pagination.page ? pagination.page : 1;
    this.take = 6;
  }

  get Order(): Order {
    return this.order;
  }

  get Page(): number {
    return this.page;
  }

  get Take(): number {
    return this.take;
  }

  get Skip(): number {
    return (this.page - 1) * this.take;
  }
}
