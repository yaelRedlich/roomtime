
export class CreateRoomDto {
    name: string;
    description: string;
    location: string;
    pricePerHour: number;
    capacity: number;
    images?: string[];
}