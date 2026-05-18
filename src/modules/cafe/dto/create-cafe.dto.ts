import {
    IsString,
    IsOptional,
    IsNumber,
    IsLatitude,
    IsLongitude,
    IsPhoneNumber,
    MaxLength,
} from 'class-validator';

export class CreateCafeDto {
    @MaxLength(100)
    @IsString({
        message: 'Name must be a string',
    })
    name: string;

    @IsOptional()
    @MaxLength(255)
    @IsString({
        message: 'Tagline must be a string',
    })
    tagline?: string;

    @MaxLength(255)
    @IsString({
        message: 'Address must be a string',
    })
    address: string;

    @MaxLength(100)
    @IsString({
        message: 'City must be a string',
    })
    city: string;

    @IsOptional()
    @IsNumber()
    @IsLatitude()
    latitude?: number;

    @IsOptional()
    @IsNumber()
    @IsLongitude()
    longitude?: number;

    @IsOptional()
    @MaxLength(100)
    @IsString({
        message: 'Open hours must be a string',
    })
    open_hours?: string;

    @IsOptional()
    @IsString({
        message: 'Phone number must be a string',
    })
    phone_number?: string;

    @IsOptional()
    @IsString({
        message: 'Instagram must be a string',
    })
    @MaxLength(100)
    instagram?: string;
}

// export class CreateCafeDto {
//     name: string;
//     tagline?: string;
//     address: string;
//     city: string
//     latitude?: number;
//     longitude?: number;
//     open_hours?: string;
//     phone_number?: string;
//     instagram?: string;
// }
