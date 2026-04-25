import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { type Model, type ProjectionType, Types } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User, type UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(body: CreateUserDto) {
    const existingUser = await this.userModel
      .findOne({
        username: body.username,
      })
      .exec();

    if (existingUser) {
      throw new BadRequestException(
        'A user with that username already exists.',
      );
    }

    try {
      const payload: User = {
        username: body.username,
        password: hashSync(body.password, 12),
      };

      await this.userModel.create(payload);

      return { message: 'User created successfully.' };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new BadRequestException('Failed to create user.');
    }
  }

  async findById(
    id: Types.ObjectId,
    projection?: ProjectionType<UserDocument>,
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id.');
    }

    const user = await this.userModel.findById(id, projection).exec();

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return { message: 'User found.', data: user };
  }

  async deleteById(id: Types.ObjectId) {
    const { data: user } = await this.findById(id);

    try {
      await user.deleteOne();
      return { message: 'User deleted successfully.' };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new BadRequestException('Failed to delete user.');
    }
  }
}
