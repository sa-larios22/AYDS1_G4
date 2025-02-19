import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FlightsModule } from './flights/flights.module';
import { GatesModule } from './gates/gates.module';

@Module({
  imports: [AuthModule, FlightsModule, GatesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
