import { Stock } from "modules/stock/entities/stock.entity";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { Receipt } from "../entities/receipt.entity";

@EventSubscriber()
export class ReceiptsSubscriber implements EntitySubscriberInterface<Receipt>{

    listenTo(): string | Function {
        return Receipt;
    }

    async afterInsert(event: InsertEvent<Receipt>): Promise<any> {
        const stockRepo = event.manager.getRepository(Stock);
        const stockToSave = await Promise.all(
            event.entity.receiptToStock.map( async (rts) => {
                const stock = await stockRepo.findOne({ where: {id: rts.stockId} });
                stock.cost = rts.totalCost / rts.quantity;
                stock.quantity += rts.quantity;
                return stock;
        }));
        console.log(stockToSave);
        stockRepo.save(stockToSave);
    }
}