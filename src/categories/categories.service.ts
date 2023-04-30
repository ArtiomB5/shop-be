import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  findAll() {
    return this.prisma.category.findMany({
      where: {
        published: true,
      },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findFirst({ where: { id } });
    if (category !== null) {
      return category;
    } else {
      throw new NotFoundException();
    }
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      this.prisma.category
        .update({
          where: { id },
          data: { ...updateCategoryDto },
        })
        .then(() => this.prisma.category.findFirst({ where: { id } }));
    } catch (error) {
      return 'Wrong data';
    }
  }

  remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
