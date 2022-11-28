import { Injectable } from "@nestjs/common";
import { EventEmitter } from "events";
import { fromEvent } from "rxjs";

@Injectable()
export class SseService {
    private readonly emitter: EventEmitter;
    
    constructor(){ this.emitter = new EventEmitter() }

    subscribe(channel: string) {
        return fromEvent(this.emitter, channel);
    }

    emit(channel: string, data?: object) {
        this.emitter.emit(channel, {data});
    }
}