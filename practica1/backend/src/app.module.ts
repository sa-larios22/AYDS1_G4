import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FlightsModule } from './flights/flights.module';
import { GatesModule } from './gates/gates.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    AuthModule, 
    FlightsModule, 
    GatesModule,
    ConfigModule.forRoot(),
    CommonModule
  
  ]
})
export class AppModule {}
