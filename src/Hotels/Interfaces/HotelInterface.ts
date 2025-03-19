import { HotelRoom } from "../HotelRoomSchema";
import { UpdateHotelDto } from "../Dtos/UpdateHotelDto";
import { Hotel } from "../HotelSchema";

export interface SearchHotelParams {
  limit: number;
  offset: number;
}

export interface UpdateHotelParams {
  title: string;
  description: string;
}

export interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: string): Promise<Hotel>;
  search(params: SearchHotelParams): Promise<Hotel[]>;
  update(id: string, data: UpdateHotelParams): Promise<Hotel>;
}

export interface SearchRoomsParams {
  limit: number;
  offset: number;
  title: string;
  hotel: string;
  isEnabled?: boolean;
}

export interface HotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: string): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom>;
}
