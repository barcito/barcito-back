import { Product } from "modules/products/entities/product.entity";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { OrderedProduct } from "../entities/ordered-product.entity";

@EventSubscriber()
export class OrderedProductSubscriber implements EntitySubscriberInterface<OrderedProduct>{

    listenTo(): any{
        return OrderedProduct;
    }

    async afterInsert(event: InsertEvent<OrderedProduct>): Promise<any> {
        const productRepository = event.manager.getRepository(Product);
        const product = await productRepository.findOne({ where: event.entity.product});
        product.stock -= event.entity.quantity;
        event.entity.lockedPrice = product.finalSellPrice;
        await productRepository.save(product);
    }
}