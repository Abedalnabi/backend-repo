// src/property/property.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entity/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { User } from '../user/entity/user.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async create(dto: CreatePropertyDto, user: User): Promise<Property> {
    const property = this.propertyRepository.create({
      ...dto,
      user,
    });
    return this.propertyRepository.save(property);
  }

  async findAllByUser(userId: number): Promise<Property[]> {
    return this.propertyRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, userId: number): Promise<Property> {
    console.log('id', id);
    console.log('userId', userId);
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!property) throw new NotFoundException('Property not found');
    if (property.user.id !== userId)
      throw new ForbiddenException('Access denied');

    return property;
  }

  async update(
    id: number,
    dto: UpdatePropertyDto,
    userId: number,
  ): Promise<Property> {
    const property = await this.findOne(id, userId);
    Object.assign(property, dto);
    return this.propertyRepository.save(property);
  }

  async remove(id: number, userId: number): Promise<void> {
    const property = await this.findOne(id, userId);
    await this.propertyRepository.remove(property);
  }
}
