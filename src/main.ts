import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;

  const config = new DocumentBuilder()
  .setTitle('lgoChaja')
  .setDescription('lgoChaja 프로젝트 API 명세서')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  document.paths = {}; // 디폴트 경로를 제거

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      servers: [],
    },
  })
  await app.listen(PORT);
  console.log(`server listening on port ${PORT}`);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();