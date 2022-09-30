import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'database/database.module';
import { UsersModule } from 'modules/users/users.module';
import { AuthModule } from 'modules/auth/auth.module';
import { BarcitosModule } from 'modules/barcitos/barcitos.module';
import { FilesModule } from 'files/files.module';
import { ApplicationsModule } from 'modules/applications/applications.module';
import { ProductsModule } from './products/products.module';

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
  ],
})
export class AppModule {}
