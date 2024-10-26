import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@sportix/models';
import { SignupRequestDto } from '@sportix/dtos';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Метод для регистрации нового пользователя
  async signup(SignupRequestDto: SignupRequestDto): Promise<User> {
    return this.userModel.create(SignupRequestDto);
  }

  // Метод для поиска пользователя по email и tagName
  async findForSignin(emailOrTagName: string): Promise<User | null> {
    return this.userModel.findOne({
      $or: [{ email: emailOrTagName }, { tagName: emailOrTagName }],
    });
  }
}
