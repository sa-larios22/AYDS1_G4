import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateOrderDto, CreateTicketDto, UpdateTicketDto } from './dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TicketService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('TicketService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  async create(createTicketDto: CreateTicketDto) {
    const { type, price, totalSeats, flightId, userId } = createTicketDto;
    try {

      const ticket = await this.ticket.create({
        data: {
          type,
          price,
          totalSeats,
          availableSeats: totalSeats,
          soldSeats: 0,
          flightId,
          created_by: userId
        }
      });

      return ticket;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error creating ticket');
    }
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    try {
      const updatedTicker = await this.ticket.update({
        where: {
          id
        },
        data: {
          ...updateTicketDto
        }
      })

      return updatedTicker;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error updating ticket');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const tickets = await this.ticket.findMany({
      where: {
        active: true
      },
      take: limit,
      skip: offset,
      include: {
        flight: true
      }
    });

    return tickets;
  }

  async findOne(id: number) {
    const ticket = await this.ticket.findUnique({
      where: {
        id
      }
    });
    
    return ticket;
  }

  remove(id: number) {
    try {
      const desactivedTicket = this.ticket.update({
        where: {
          id
        },
        data: {
          active: false
        }
      });

      return desactivedTicket;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error desactivating ticket');
    };
  }

  // USER ACTIONS
  async shop(createOrderDto: CreateOrderDto) {
    const { userId, orderDetails } = createOrderDto;

    try {
      const total = orderDetails.reduce( (acc, orderItem) => {
        return orderItem.price * orderItem.quantity;
      }, 0 );
  
      const order = await this.order.create({
        data: {
          userId,
          total,
          amount: orderDetails.length,
          details: {
            createMany: {
              data: orderDetails.map( item => {
                return {
                  quantity: item.quantity,
                  price: item.price,
                  ticketId: item.ticketId
                }
              })
            }
          }
        },
        include: {
          user: true,
          details: {
            select: {
              ticket: {
                select: {
                  id: true,
                  type: true,
                }
              },
              price: true,
              quantity: true
            }
          }
        }
      });
      return order;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error creating order');
    }
  }
}
