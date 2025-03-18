import { UseGuards } from "@nestjs/common";
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { ManagerOrClientWsGuard } from "../Guards/ManagerOrClientWsGuard";
import { SupportRequestService } from "../SupportRequests/SupportRequestService";

@WebSocketGateway()
export class Gateway {
  constructor(private readonly supportRequestService: SupportRequestService) {}

  @WebSocketServer() wss: Server;

  @SubscribeMessage("subscribeToChat")
  @UseGuards(ManagerOrClientWsGuard)
  handleMessage(client: Socket, payload: { supportRequest: string }): void {
    this.supportRequestService.subscribe((supportRequest, message) => {
      if (payload.supportRequest === supportRequest.id) {
        this.wss.emit("subscribeToChat", message);
      }
    });
  }
}
