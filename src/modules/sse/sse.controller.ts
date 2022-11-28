import { Controller, Request, Sse, Post, Param, ParseIntPipe, Body } from "@nestjs/common";
import { MessageEvent } from "./message-event.interface";
import { SseService } from "./sse.service";

@Controller('sse')
export class SseController {

    constructor(private readonly sseService: SseService){}

    @Sse('orderStatus/:userId')
    events(@Param('userId', ParseIntPipe) userId: number) {
        return this.sseService.subscribe(`orderStatus/${userId}`);
    }

    @Post('orderStatus/:userId')
    async emit(@Param('userId', ParseIntPipe) userId: number, @Body() message: MessageEvent) {
        this.sseService.emit(`orderStatus/${userId}`, message);
        return {ok: true};
    }
}