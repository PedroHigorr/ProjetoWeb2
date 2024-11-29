import { Module } from '@nestjs/common';
import { CrudUsuario } from './repositories/user.crud';
import { UserService } from './user.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports: [SharedModule],
    providers: [CrudUsuario, UserService],
    exports: [CrudUsuario]
})
export class UserModule {}
