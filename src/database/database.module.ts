import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderSubscriber } from 'modules/orders/subscribers/order.subscriber';
import { ReceiptsSubscriber } from 'modules/receipts/subscribers/receipts.subscriber';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [],
        subscribers: [
          OrderSubscriber,
          ReceiptsSubscriber
        ],
        synchronize: true,
        autoLoadEntities: true, //quit on prod
      }),
    }),
  ],
})
export class DatabaseModule {}
