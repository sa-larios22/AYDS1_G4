import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CreateOrderDto } from './dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  // PERSONAL ACTIONS
  @Post('create')
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }

  @Get()
  findAll( @Body() paginationDto: PaginationDto ) {
    return this.ticketService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }

  // ADMIN ACTIONS


  // USERS ACTIONS
  @Post('shop')
  shop(@Body() createOrderDto: CreateOrderDto) {
    return this.ticketService.shop(createOrderDto);
  }
}
