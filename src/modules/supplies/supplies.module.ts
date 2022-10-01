import { Module } from '@nestjs/common';
import { SuppliesService } from './supplies.service';
import { SuppliesController } from './supplies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supply } from './entities/supply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Supply])],
  controllers: [SuppliesController],
  providers: [SuppliesService],
})
export class SuppliesModule {}
