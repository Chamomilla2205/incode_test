import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './shared/db/entities/user.entity';

@Module({
  imports: [
    UserModule, 
    AuthModule,
    TypeOrmModule.forRoot(
      {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'incode',
      synchronize: false,
      autoLoadEntities: true,
      entities: [
        UserEntity,
      ],
      migrations: ['dist/migrations/*.js'],
    }
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
