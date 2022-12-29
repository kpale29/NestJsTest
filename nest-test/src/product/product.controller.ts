import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { CreateProductDTO } from "./dto/product.dto";
import { ProductService } from "./product.service";
import { Product } from './interfaces/product.interface'

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) {

    }

    @Post('/')
    async postAsync(@Res() res, @Body() createProductDTO: CreateProductDTO): Promise<Product> {
        return res.status(HttpStatus.CREATED).json({
            product: await this.productService.createProduct(createProductDTO)
        });
    }

    @Get('/')
    async getAllAsync(@Res() res): Promise<Product[]> {
        return res.status(HttpStatus.OK).json({
            products: await this.productService.getProducts()
        });
    }

    @Get('/:productID')
    async getByIdAsync(@Res() res, @Param('productID') productId: string): Promise<Product> {
        const product: Product = await this.productService.getProduct(productId);
        if (!product) throw new NotFoundException('Product Does not exist');
        return res.status(HttpStatus.OK).json(product);
    }

    @Delete('/')
    async deleteAsync(@Res() res, @Query('productID') productId: string): Promise<Product> {
        const product: Product = await this.productService.deleteProduct(productId);
        if (!product) throw new NotFoundException('Product Does not exist');
        return res.status(HttpStatus.OK).json(product);
    }

    @Put('/:productID')
    async updateAsync(@Res() res, @Param('productID') productId: string, @Body() createProductDTO: CreateProductDTO): Promise<Product> {
        const product: Product = await this.productService.updateProduct(productId, createProductDTO);
        if (!product) throw new NotFoundException('Product Does not exist');
        return res.status(HttpStatus.OK).json(product);
    }




}
