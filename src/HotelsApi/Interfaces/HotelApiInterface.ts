export interface SearchHotelParams {
  limit: number;
  offset: number;
}

export interface SearchRoomParams {
  limit: number;
  offset: number;
  title: string;
  hotel: string;
}
