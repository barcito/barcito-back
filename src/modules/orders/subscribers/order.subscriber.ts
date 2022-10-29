import { OrderStatus } from "enums/order-status.enum";
import { Product } from "modules/products/entities/product.entity";
import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from "typeorm";
import { Order } from "../entities/order.entity";

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<Order>{

    listenTo(): any{
        return Order;
    }

    /* afterUpdate(event: UpdateEvent<Order>): void | Promise<any> {
        const productRepository = event.manager.getRepository(Product);
        if(event.databaseEntity.status === OrderStatus.CANCELLED || event.databaseEntity.status === OrderStatus.REJECTED){
            event.databaseEntity.products.map( async (orderedProduct) =>{
                const product = await productRepository.findOne({ where: {id: orderedProduct.product.id}});
                product.stock += orderedProduct.quantity;
                await productRepository.save(product);
            });
        }
    } */
}