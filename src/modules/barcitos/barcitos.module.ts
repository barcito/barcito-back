import { Module } from '@nestjs/common';
import { BarcitosService } from './barcitos.service';
import { BarcitosController } from './barcitos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barcito } from './entities/barcito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Barcito])],
  controllers: [BarcitosController],
  providers: [BarcitosService],
  exports: [BarcitosService],
})
export class BarcitosModule {}
