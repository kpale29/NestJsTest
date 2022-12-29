import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose'
import { Product } from './interfaces/product.interface'
import { CreateProductDTO } from './dto/product.dto'

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async getProducts(): Promise<Product[]> {
        return await this.productModel.find();
    }

    async getProduct(productId: string): Promise<Product> {
        return await this.productModel.findById(productId);
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        return await new this.productModel(createProductDTO).save();        
    }

    async deleteProduct(productId: string): Promise<Product>{
        return await this.productModel.findByIdAndDelete(productId);
    }

    async updateProduct(productId: string, createProductDTO: CreateProductDTO): Promise<Product>{
        return await this.productModel.findByIdAndUpdate(productId,createProductDTO,{new: true});
    }
}
