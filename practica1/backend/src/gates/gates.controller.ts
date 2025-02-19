import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GatesService } from './gates.service';
import { CreateGateDto } from './dto/create-gate.dto';
import { UpdateGateDto } from './dto/update-gate.dto';

@Controller('gates')
export class GatesController {
  constructor(private readonly gatesService: GatesService) {}

  @Post()
  create(@Body() createGateDto: CreateGateDto) {
    return this.gatesService.create(createGateDto);
  }

  @Get()
  findAll() {
    return this.gatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGateDto: UpdateGateDto) {
    return this.gatesService.update(+id, updateGateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gatesService.remove(+id);
  }
}
