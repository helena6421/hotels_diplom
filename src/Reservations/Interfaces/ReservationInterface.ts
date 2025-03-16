import { CreateReservationDto } from "../Dtos/CreateReservationDto";
import { Reservation } from "../ReservationSchema";

export interface ReservationDto {
  userId: string;
  hotelId: string;
  roomId: string;
  dateStart: Date;
  dateEnd: Date;
}

export interface ReservationSearchOptions {
  user: string;
  dateStart?: Date;
  dateEnd?: Date;
}

export interface IReservation {
  addReservation(data: CreateReservationDto): Promise<Reservation>;
  removeReservation(id: string): Promise<void>;
  getReservations(
    filter: ReservationSearchOptions
  ): Promise<Array<Reservation>>;
}
