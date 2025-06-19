// src/property/property.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/entity/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  create(@Body() dto: CreatePropertyDto, @GetUser() user: User) {
    return this.propertyService.create(dto, user);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.propertyService.findAllByUser(user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    console.log('user', user);
    return this.propertyService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePropertyDto,
    @GetUser() user: User,
  ) {
    return this.propertyService.update(id, dto, user.id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.propertyService.remove(id, user.id);
  }
}
