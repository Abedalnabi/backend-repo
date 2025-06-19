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
import { PropertyResponseDto } from './dto/property-response.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async create(
    dto: CreatePropertyDto,
    user: User,
  ): Promise<PropertyResponseDto> {
    const property = this.propertyRepository.create({ ...dto, user });
    const saved = await this.propertyRepository.save(property);
    return this.toResponseDto(saved);
  }

  async findAllByUser(userId: number): Promise<PropertyResponseDto[]> {
    const properties = await this.propertyRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
    return properties.map(this.toResponseDto);
  }

  async findOne(id: number, userId: number): Promise<PropertyResponseDto> {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!property) throw new NotFoundException('Property not found');
    if (property.user.id !== userId)
      throw new ForbiddenException('Access denied');

    return this.toResponseDto(property);
  }

  async update(
    id: number,
    dto: UpdatePropertyDto,
    userId: number,
  ): Promise<PropertyResponseDto> {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!property) throw new NotFoundException('Property not found');
    if (property.user.id !== userId)
      throw new ForbiddenException('Access denied');

    Object.assign(property, dto);
    const saved = await this.propertyRepository.save(property);
    return this.toResponseDto(saved);
  }

  async remove(id: number, userId: number): Promise<void> {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!property) throw new NotFoundException('Property not found');
    if (property.user.id !== userId)
      throw new ForbiddenException('Access denied');

    await this.propertyRepository.remove(property);
  }

  toResponseDto = (property: Property): PropertyResponseDto => ({
    id: property.id,
    title: property.title,
    description: property.description,
    price: Number(property.price),
    location: property.location,
    createdAt: property.createdAt,
  });
}
