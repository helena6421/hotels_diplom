import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

import { CreateReservationDto } from "./Dtos/CreateReservationDto";
import {
  ReservationSearchOptions,
  IReservation,
} from "./Interfaces/ReservationInterface";
import { Reservation, ReservationDocument } from "./ReservationSchema";

@Injectable()
export class ReservationService implements IReservation {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>
  ) {}

  async addReservation(data: CreateReservationDto): Promise<Reservation> {
    const createdReservation = new this.reservationModel(data);
    const { id } = await createdReservation.save();
    return await this.reservationModel
      .findById(id, "dateStart dateEnd")
      .populate("hotelRoom", "title description images")
      .populate("hotel", "title description");
  }

  async removeReservation(id: string): Promise<void> {
    return this.reservationModel
      .findByIdAndDelete(id)
      .exec()
      .then((res) => {
        if (res === null) {
          throw new BadRequestException("Reservation does not exist");
        }

        return null;
      });
  }

  getReservations(filter: ReservationSearchOptions): Promise<Reservation[]> {
    const queryFilter: FilterQuery<Reservation> = {};

    if (filter) {
      if (filter.dateStart) {
        queryFilter.dateStart = new Date(filter.dateStart);
      }

      if (filter.dateEnd) {
        queryFilter.dateEnd = new Date(filter.dateEnd);
      }

      if (filter.user) {
        queryFilter.user = filter.user;
      }
    }

    return this.reservationModel
      .find(queryFilter, "dateStart dateEnd")
      .populate("hotelRoom", "title description images")
      .populate("hotel", "title description")
      .exec();
  }

  matchClientId(user: any, reservationId: any) {
    return this.reservationModel.exists({ _id: reservationId, user });
  }
}
