import { plainToInstance } from 'class-transformer';
import { CreateCategoryDto } from './create-category.dto';
import { validate } from 'class-validator';

describe('create-category.dto', () => {
  let dto = {};

  it('title is required validation', async () => {
    dto = {
      published: false,
    };
    const importOfDTO = plainToInstance(CreateCategoryDto, dto);
    const errors = await validate(importOfDTO);
    expect(errors[0].property === 'title').toBeTruthy();
    expect(errors[0].constraints.hasOwnProperty('isNotEmpty')).toBeTruthy();
    expect(errors[0].constraints.hasOwnProperty('isString')).toBeTruthy();
  });
  it('title is not empty validation', async () => {
    dto = {
      title: '',
      published: false,
    };
    const importOfDTO = plainToInstance(CreateCategoryDto, dto);
    const errors = await validate(importOfDTO);
    console.log(errors);
    expect(errors[0].property === 'title').toBeTruthy();
    expect(errors[0].constraints.hasOwnProperty('isNotEmpty')).toBeTruthy();
  });

  it('title is string validation', async () => {
    dto = {
      title: false,
      published: false,
    };
    const importOfDTO = plainToInstance(CreateCategoryDto, dto);
    const errors = await validate(importOfDTO);
    expect(errors[0].property === 'title').toBeTruthy();
    expect(errors[0].constraints.hasOwnProperty('isString')).toBeTruthy();
  });

  it('published is boolean validation', async () => {
    dto = {
      title: 'test title',
      published: 'false',
    };
    const importOfDTO = plainToInstance(CreateCategoryDto, dto);
    const errors = await validate(importOfDTO);
    expect(errors[0].property === 'published').toBeTruthy();
    expect(errors[0].constraints.hasOwnProperty('isBoolean')).toBeTruthy();
  });

  it('published is optional', async () => {
    dto = {
      title: 'test title',
    };
    const importOfDTO = plainToInstance(CreateCategoryDto, dto);
    const errors = await validate(importOfDTO);
    expect(errors).toEqual([]);
  });
});
