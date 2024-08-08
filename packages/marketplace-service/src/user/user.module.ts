import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSchema, Users } from '@app/shared/models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
