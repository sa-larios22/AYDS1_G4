import { BadRequestException, Injectable, InternalServerErrorException, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

import * as bcrypt from 'bcrypt';
import { CreateAuthDto, LoginAuthDto, UpadtePasswordDto, UpdateAuthDto } from './dto';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit  {

  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  async create(createAuthDto: CreateAuthDto) {
    try {
      const { name, lastname, email, password, role, username } = createAuthDto;

      const user = await this.user.findFirst({
        where: {
          OR: [
            {
              email: email,
            },
            {
              username: username,
            },
          ],
        },
      })

      if (user) {
        throw new Error('User already exists');
      }

      return await this.user.create({
        data: {
          name,
          lastname,
          email,
          password: await bcrypt.hash(password, 10),
          username,
          role
        },
        select: {
          id: true,
          name: true,
          lastname: true,
          email: true,
          username: true,
          role: true,
          password: false,
        }
      });

      
    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async login(loginAuthDto: LoginAuthDto) {
    const { password, email } = loginAuthDto;

    const user = await this.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true
      }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if ( !bcrypt.compareSync(password, user.password) ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  async findAll( paginationDto: PaginationDto ) {
    const { limit = 10, offset = 0 } = paginationDto;

    const users = await this.user.findMany({
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        username: true,
        role: true,
        password: false,
      }
    })

    return users;
  }

  async findOne(id: number) {
    try {
      console.log('test');
      console.log(Number(id));

      if (!Number(id)) {
        throw new BadRequestException('Invalid ID');
      }

      const product = await this.user.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!product) {
        throw new BadRequestException('User not found');
      }
  
      return product;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    const { ...data } = updateAuthDto;

    const product = this.findOne(id);

    if (!product) {
      throw new BadRequestException('User not found');
    }

    const { password: __, ...rest } = data;

    return await this.user.update({
      where: {
        id: id,
      },
      data: {
        ...rest,
      },
    });
  }

  async updatePassword(id: number, upadtePasswordDto: UpadtePasswordDto) {
    const { password } = upadtePasswordDto;
    
    const product = this.findOne(id);

    if (!product) {
      throw new BadRequestException('User not found');
    }

    return await this.user.update({
      where: {
        id: id,
      },
      data: {
        password: await bcrypt.hash(password, 10),
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        username: true,
        role: true,
        password: false,
      }
    });
  }

  async remove(id: number) {
    const product = await this.user.update({
      where: {
        id: id,
      },
      data: {
        active: false,
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        username: true,
        role: true,
        password: false,
      }
    })

    return product;
  }

  async checkAuthStatus( user: User ) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    }
  }

  private getJwtToken( payload: JwtPayload ) {
  
    const token = this.jwtService.sign( payload );

    return token;
  
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    console.log(error);
    throw new InternalServerErrorException('Check server logs');
  }
}
