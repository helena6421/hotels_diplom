import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateReservationDto } from "src/Reservations/Dtos/CreateReservationDto";
import { ReservationSearchOptions } from "src/Reservations/Interfaces/ReservationInterface";
import { Reservation } from "src/Reservations/ReservationSchema";
import { ReservationService } from "src/Reservations/ReservationService";

@Injectable()
export class ReservationApiService {
  constructor(private readonly reservationsService: ReservationService) {}

  addReservation(data: CreateReservationDto): Promise<Reservation> {
    return this.reservationsService.addReservation(data);
  }

  removeReservation(user, id: string): Promise<void> {
    return this.matchClientId(user, id).then((isMatch) => {
      if (isMatch) {
        return this.reservationsService.removeReservation(id);
      } else {
        throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
      }
    });
  }

  getReservations(filter: ReservationSearchOptions): Promise<Reservation[]> {
    return this.reservationsService.getReservations(filter);
  }

  matchClientId(user, id) {
    return this.reservationsService.matchClientId(user, id);
  }

  getReservationsByUserId(userId: string) {
    return this.reservationsService.getReservations({ user: userId });
  }

  removeReservationsByUserId(userId: string, id: string) {
    return this.matchClientId(userId, id).then((isMatch) => {
      if (isMatch) {
        return this.reservationsService.removeReservation(id);
      } else {
        throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
      }
    });
  }
}
