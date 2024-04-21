// MailModule
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          auth: {
            user: process.env.EMAILADDRESS,
            pass: process.env.EMAILPASSWORD,
          },
          secure: true
        },
        defaults: {
          from: `<${process.env.EMAILADDRESS}>`,
        },
      }),
    }),
    UsersModule,
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [MailController],
  providers: [MailService, UsersService],
  
})
export class MailModule {}
