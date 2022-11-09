import { OrderStatus } from "enums/order-status.enum";
import { Product } from "modules/products/entities/product.entity";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { Order } from "../entities/order.entity";

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<Order>{

    listenTo(): any{
        return Order;
    }

    async beforeInsert(event: InsertEvent<Order>): Promise<any> {
        const productRepository = event.manager.getRepository(Product);
        const prodsToSave = event.entity.products.map( async (prod) => {
            const product = await productRepository.findOne({ where: {id: prod.productId}});
            prod.lockedPrice = product.finalSellPrice;
            return prod;
        } )
        event.entity.products = await Promise.all(prodsToSave);
        event.entity.code = "asdasfa";
        event.entity.amount = 123.5;
    }
}