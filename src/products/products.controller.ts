import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProtectGuard } from './guards/protect.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    try {
      return this.productsService.findOne(+id);

    } catch (error) {
      throw new NotFoundException(error.message);
    }

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(ProtectGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
