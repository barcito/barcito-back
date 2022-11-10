import { OrderStatus } from "enums/order-status.enum";
import { Product } from "modules/products/entities/product.entity";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { Order } from "../entities/order.entity";

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<Order>{

    listenTo(): any{
        return Order;
    }

    /* async beforeInsert(event: InsertEvent<Order>): Promise<any> {
        const productRepository = event.manager.getRepository(Product);
        const supplyRepository = event.manager.getRepository(Supply);
        const prodsToSave = [];
        let suppsToSave = [];
        let amount = 0;
        const prodsToOrder = await Promise.all(
            event.entity.products.map( async (prod) => {
                const product = await productRepository.findOne({ where: {id: prod.productId}, relations: { stock: true, productToSupplies: true } });
                const supps = await Promise.all(
                    product.productToSupplies.map( async (pts) => {
                        const supply = await supplyRepository.findOne({ where: {id: pts.supplyId}, relations: { stock: true} });
                        supply.stock.quantity -= pts.quantity * prod.quantity;
                        return supply;
                    })
                );
                suppsToSave = suppsToSave.concat(supps);
                product.stock.quantity -= prod.quantity;
                prodsToSave.push(product);
                prod.lockedPrice = product.finalSellPrice;
                amount += prod.lockedPrice * prod.quantity;
                return prod;
            })
        );
        await productRepository.save(prodsToSave);
        await supplyRepository.save(suppsToSave);
        event.entity.products = prodsToOrder;
        event.entity.code = Date.now();
        event.entity.amount = amount;
    }

    async afterUpdate(event: UpdateEvent<Order>): Promise<any> {
        if(event.entity.status === 'Rechazado' || event.entity.status === 'Cancelado'){
            const orderRepository = event.manager.getRepository(Order);
            const productRepository = event.manager.getRepository(Product);
            const supplyRepository = event.manager.getRepository(Supply);
            const order = await orderRepository.findOne({where: {id: event.entity.id}, relations: { products: true }});
            let suppsToSave = [];
            const prodsToSave = await Promise.all(
                order.products.map( async (prod, i) => {
                    const product = await productRepository.findOne({ where: {id: prod.productId}, relations: { stock: true, productToSupplies: true } });
                    const supps = await Promise.all(
                        product.productToSupplies.map( async (pts) => {
                            const supply = await supplyRepository.findOne({ where: {id: pts.supplyId}, relations: { stock: true} });
                            supply.stock.quantity += pts.quantity * prod.quantity;
                            return supply;
                        })
                    );
                    suppsToSave = suppsToSave.concat(supps);
                    product.stock.quantity += prod.quantity;
                    return product;
                })
            );
            await productRepository.save(prodsToSave);
            await supplyRepository.save(suppsToSave);
        }
    } */
}