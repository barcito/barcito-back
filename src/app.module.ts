import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'database/database.module';
import { UsersModule } from 'modules/users/users.module';
import { AuthModule } from 'modules/auth/auth.module';
import { BarcitosModule } from 'modules/barcitos/barcitos.module';
import { FilesModule } from 'files/files.module';
import { ApplicationsModule } from 'modules/applications/applications.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AcademicUnitsModule } from './modules/academic-units/academic-units.module';
import { ReceiptsModule } from './modules/receipts/receipts.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderedProductsModule } from './modules/ordered-products/ordered-products.module';
import { StockModule } from './modules/stock/stock.module';
import { ReceiptToStockModule } from './modules/receipt-to-stock/receipt-to-stock.module';
import { ProductToStockModule } from './modules/product-to-stock/product-to-stock.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    BarcitosModule,
    FilesModule,
    ApplicationsModule,
    ProductsModule,
    CategoriesModule,
    AcademicUnitsModule,
    ReceiptsModule,
    OrdersModule,
    OrderedProductsModule,
    StockModule,
    ReceiptToStockModule,
    ProductToStockModule,
  ],
})
export class AppModule {}
