import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto, UpadtePasswordDto } from './dto';
import { Auth, GetUser } from './decorators';
import { User } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Get()
  findAll(@Body() paginationDto: PaginationDto) {
    return this.authService.findAll(paginationDto);
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Get('check-status')
  @Auth()
  checkStatus(
    @GetUser() user: User  
  ) {
    return this.authService.checkAuthStatus(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Patch('password/:id')
  updatePassword(@Param('id') id: string, @Body() upadtePasswordDto: UpadtePasswordDto) {
    return this.authService.updatePassword(+id, upadtePasswordDto);
  }

  @Patch('delete/:id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
