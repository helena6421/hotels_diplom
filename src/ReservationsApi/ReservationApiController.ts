import {
  Body,
  Controller,
  Delete,
  Get,
  Request,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ClientGuard } from "src/Guards/ClientGuard";
import { AuthenticatedGuard } from "src/Guards/AuthGuard";
import { CreateReservationDto } from "src/Reservations/Dtos/CreateReservationDto";
import { ReservationSearchOptions } from "src/Reservations/Interfaces/ReservationInterface";
import { ReservationApiService } from "./ReservationApiService";
import { ManagerGuard } from "src/Guards/ManagerGuard";

@Controller()
export class ReservationApiController {
  constructor(private readonly reservationsApiService: ReservationApiService) {}

  @UseGuards(AuthenticatedGuard, ClientGuard)
  @Post("api/client/reservations")
  addReservation(
    @Request() req,
    @Body() createReservationDto: Exclude<CreateReservationDto, "user">
  ) {
    return this.reservationsApiService.addReservation({
      ...createReservationDto,
      user: req.user._doc._id,
    });
  }

  @UseGuards(AuthenticatedGuard, ClientGuard)
  @Get("api/client/reservations")
  getReservations(
    @Request() req,
    @Query() filter: Exclude<ReservationSearchOptions, "user">
  ) {
    return this.reservationsApiService.getReservations({
      ...filter,
      user: req.user._doc._id,
    });
  }

  @UseGuards(AuthenticatedGuard, ClientGuard)
  @Delete("api/client/reservations/:id")
  removeReservation(@Request() req, @Param("id") id: string) {
    return this.reservationsApiService.removeReservation(req.user, id);
  }

  @UseGuards(AuthenticatedGuard, ManagerGuard)
  @Get("api/manager/reservations/:userId")
  getReservationsByUserId(@Param("userId") userId: string) {
    return this.reservationsApiService.getReservationsByUserId(userId);
  }

  @UseGuards(AuthenticatedGuard, ManagerGuard)
  @Delete("api/manager/reservations/:userId/:id")
  removeReservationsByUserId(
    @Param("userId") userId: string,
    @Param("id") id: string
  ) {
    return this.reservationsApiService.removeReservationsByUserId(userId, id);
  }
}
