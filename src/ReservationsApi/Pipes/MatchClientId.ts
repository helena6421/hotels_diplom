import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";
import { ReservationApiService } from "../ReservationApiService";

@Injectable()
export class MatchClientId
  implements PipeTransform<{ user: string; reservationId: string }>
{
  constructor(private readonly reservationApiService: ReservationApiService) {}

  transform(
    value: { user: string; reservationId: string },
    metadata: ArgumentMetadata
  ) {
    return this.reservationApiService.matchClientId(
      value.user,
      value.reservationId
    );
  }
}
