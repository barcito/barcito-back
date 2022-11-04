import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from "typeorm";
import { Product } from "../entities/product.entity";
import { each, find, isEmpty, remove } from 'lodash';
import { ProductToSupply } from "modules/product-to-supply/entities/product-to-supply.entity";

@EventSubscriber()
export class ProductsSubscriber implements EntitySubscriberInterface<Product>{

    listenTo(): any{
        return Product;
    }

    async afterUpdate(event: UpdateEvent<Product>): Promise<any> {
        if(event.entity.productToSupplies){
            const out = [];
            each(event.databaseEntity.productToSupplies, function(o){
                let prod = find(event.entity.productToSupplies, o);
                if(isEmpty(prod)){
                    out.push(o);
                }
            })
            out.map((prodToSupply) => event.manager.delete(ProductToSupply, {id: prodToSupply.id}));
        }
    }
}