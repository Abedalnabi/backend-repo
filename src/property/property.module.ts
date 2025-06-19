// src/property/property.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entity/property.entity';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  providers: [PropertyService],
  controllers: [PropertyController],
})
export class PropertyModule {}
