import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BarcitosModule } from './barcitos/barcitos.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    BarcitosModule,
    FilesModule
  ]
})
export class AppModule {}
