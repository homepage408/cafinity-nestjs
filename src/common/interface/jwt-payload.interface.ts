export interface JwtPayloadInterface {
    sub: number;
    uuid: string;
    email: string;
    role?: string;
}