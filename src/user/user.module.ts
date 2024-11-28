import { Module } from '@nestjs/common';
import { CrudUsuario } from './repositories/user.crud';
import { UserService } from './user.service';

@Module({
    providers: [CrudUsuario, UserService]
})
export class UserModule {}
