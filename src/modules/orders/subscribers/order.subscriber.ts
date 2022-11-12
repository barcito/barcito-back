import { OrderStatus } from "enums/order-status.enum";
import { Product } from "modules/products/entities/product.entity";
import { Stock } from "modules/stock/entities/stock.entity";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { Order } from "../entities/order.entity";

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<Order>{

    listenTo(): any{
        return Order;
    }

    async beforeInsert(event: InsertEvent<Order>): Promise<any> {
        const productRepository = event.manager.getRepository(Product);
        const stockRepository = event.manager.getRepository(Stock);
        let stockToSave = [];
        let amount = 0;
        const prodsToOrder = await Promise.all(
            event.entity.products.map( async (prod) =>{
                const orderedProductsQty = prod.quantity;
                const product = await productRepository.findOne({ where: {id: prod.productId}, relations: {productToStock: true}});
                const stock = await Promise.all(product.productToStock.map( async (pts) => {
                    const productToStockQty = pts.quantity;
                    const stock = await stockRepository.findOne({ where: {id: pts.stockId}});
                    stock.quantity -= orderedProductsQty * productToStockQty;
                    return stock;
                }));
                stockToSave = stockToSave.concat(stock);
                prod.lockedPrice = product.finalSellPrice;
                amount += prod.lockedPrice * prod.quantity;
                return prod;
            })
        );
        await stockRepository.save(stockToSave);
        event.entity.products = prodsToOrder;
        event.entity.amount = amount;
        event.entity.code = Date.now();
    }

    async afterUpdate(event: UpdateEvent<Order>): Promise<any> {
        if(event.entity.status === 'Rechazado' || event.entity.status === 'Cancelado'){
            const orderRepository = event.manager.getRepository(Order);
            const productRepository = event.manager.getRepository(Product);
            const stockRepository = event.manager.getRepository(Stock);
            const order = await orderRepository.findOne({where: {id: event.entity.id}, relations: {products: true}})
            let stockToSave = [];
            await Promise.all(order.products.map( async (prod) =>{
                const orderedProductsQty = prod.quantity;
                const product = await productRepository.findOne({ where: {id: prod.productId}, relations: {productToStock: true}});
                const stock = await Promise.all(product.productToStock.map( async (pts) => {
                    const productToStockQty = pts.quantity;
                    const stock = await stockRepository.findOne({ where: {id: pts.stockId}});
                    stock.quantity += orderedProductsQty * productToStockQty;
                    return stock;
                }));
                stockToSave = stockToSave.concat(stock);
            }));
            await stockRepository.save(stockToSave);
        }
    }
}