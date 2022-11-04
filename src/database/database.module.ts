import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'modules/users/entities/user.entity';
import { Application } from 'modules/applications/entities/application.entity';
import { Barcito } from 'modules/barcitos/entities/barcito.entity';
import { OrderedProductSubscriber } from 'modules/ordered-products/subscribers/ordered-product.subscriber';
import { OrderSubscriber } from 'modules/orders/subscribers/order.subscriber';
import { Product } from 'modules/products/entities/product.entity';
import { Supply } from 'modules/supplies/entities/supply.entity';
import { Stock } from 'modules/stock/entities/stock.entity';
import { ProductsSubscriber } from 'modules/products/subscribers/products.subscriber';
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
          OrderedProductSubscriber,
          ProductsSubscriber,
          ReceiptsSubscriber
        ],
        synchronize: true,
        autoLoadEntities: true, //quit on prod
      }),
    }),
  ],
})
export class DatabaseModule {}
