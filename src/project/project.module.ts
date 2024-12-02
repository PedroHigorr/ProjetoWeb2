import { Module } from '@nestjs/common';
import { ProjectCrud } from './repositories/project.crud';
import { SharedModule } from 'src/shared/shared.module';
import { ProjectService } from './project.service';

@Module({
    imports:[ SharedModule ],
    providers: [ ProjectCrud, ProjectService],
    exports: [ ProjectCrud ]
})
export class ProjectModule {}
