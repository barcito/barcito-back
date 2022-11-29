import { Controller, Request, Sse, Post, Param, ParseIntPipe, Body, Get } from "@nestjs/common";
import { MessageEvent } from "./message-event.interface";
import { SseService } from "./sse.service";

@Controller('sse')
export class SseController {

    constructor(private readonly sseService: SseService){}

    @Sse('orderStatus/:userId')
    orderStatus(@Param('userId', ParseIntPipe) userId: number) {
        return this.sseService.subscribe(`orderStatus/${userId}`);
    }

    @Sse('newOrder/:barcitoId')
    newOrder(@Param('barcitoId', ParseIntPipe) barcitoId: number) {
        return this.sseService.subscribe(`newOrder/${barcitoId}`);
    }

    @Post('orderStatus/:userId')
    async emitOrderStatus(@Param('userId', ParseIntPipe) userId: number, @Body() message: MessageEvent) {
        this.sseService.emit(`orderStatus/${userId}`, message);
        return {ok: true};
    }

    @Post('newOrder/:barcitoId')
    async emitNewOrder(@Param('barcitoId', ParseIntPipe) barcitoId: number, @Body() message: MessageEvent) {
        this.sseService.emit(`newOrder/${barcitoId}`, message);
        return {ok: true};
    }
}