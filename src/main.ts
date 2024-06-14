import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Lab 2 API')
    .setDescription('Skillhub API')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      description: 'Enter access token here',
      bearerFormat: 'Bearer ${token}',
      in: 'header',
      name: 'Authorization',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/docs', app, document);

  const PORT = process.env.PORT || 3000;

  // Configure CORS
  app.enableCors({
    origin: '*', // Specify the origin of your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, authorization headers)
  });

  await app.listen(PORT);

  Logger.log(`Server running on http://localhost:${PORT}/api`, 'Bootstrap');
  Logger.log(
    `Swagger running on http://localhost:${PORT}/api/docs`,
    'Bootstrap',
  );
}
bootstrap();
