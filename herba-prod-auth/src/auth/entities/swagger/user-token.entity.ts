import { ApiProperty } from "@nestjs/swagger";
import { User } from "../user.entity";


export class UserToken {
    @ApiProperty({
        example: User,
        description: 'User info',
    })
    user: User;

    @ApiProperty({
        example:'ey2323232jfdskfjks232dslkdfsdf23',
        description: 'token',
    })
    token: string;
}