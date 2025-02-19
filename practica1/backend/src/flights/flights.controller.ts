import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get()
  async findAll() {
    return this.flightsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.flightsService.findOne(Number(id));
  }

  @Post()
  async create(@Body() data: CreateFlightDto) {
    return this.flightsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateFlightDto) {
    return this.flightsService.update(Number(id), data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.flightsService.remove(Number(id));
  }

  // Assign a gate to a flight
  @Patch(':flightId/assign-gate/:gateId')
  async assignGate(
    @Param('flightId', ParseIntPipe) flightId: number,
    @Param('gateId', ParseIntPipe) gateId: number,
  ) {
    return this.flightsService.assignGate(flightId, gateId);
  }
}
