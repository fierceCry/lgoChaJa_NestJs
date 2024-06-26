import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from "./httpException.filter";
import { ValidationPipe } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { NestExpressApplication } from '@nestjs/platform-express';
import connectSessionSequelize from 'connect-session-sequelize';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = process.env.PORT || 3000;

  // Global Filters and Pipes
  app.useGlobalFilters(new HttpExceptionFilter);
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Configuration
  const config = new DocumentBuilder()
  .setTitle('lgoChaja')
  .setDescription('lgoChaja 프로젝트 API 명세서')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/swagger/lgochaja", app, document);

  // Database Configuration
  const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  // Session Configuration
  const SequelizeStore = connectSessionSequelize(session.Store);
  const sessionStore = new SequelizeStore({
    db: sequelize,
    expiration: 21600000, // 세션 만료 시간을 6시간으로 설정
    checkExpirationInterval: 21600000 // 6시간마다 만료된 세션을 체크하여 삭제
  });
  sessionStore.sync();
  
  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      store: sessionStore,
      cookie: {
        httpOnly: true,
        maxAge : 21600000 // 쿠키의 최대 유지 시간을 6시간으로 설정
      },
    }),
  );
  

  // Passport Configuration
  app.use(passport.initialize());
  app.use(passport.session());


  // CORS and Static Assets Configuration
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useStaticAssets(
    process.env.NODE_ENV === 'production'
      ? path.join(__dirname, '..', '..', 'uploads')
      : path.join(__dirname, '..', 'uploads'),
    {
      prefix: '/uploads',
    },
  );
  app.useStaticAssets(
    process.env.NODE_ENV === 'production'
      ? path.join(__dirname, '..', '..', 'public')
      : path.join(__dirname, '..', 'public'),
    {
      prefix: '/dist',
    },
  );

  // Server Start
  await app.listen(PORT);
  console.log(`server listening on port ${PORT}`);

  // Hot Module Replacement
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();