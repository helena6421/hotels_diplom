import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { UserService } from "src/Users/UserService";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UserService) {
    super();
  }

  serializeUser(user: any, done: CallableFunction) {
    done(null, user._doc._id);
  }

  async deserializeUser(payload: any, done: CallableFunction) {
    const user = await this.usersService.findById(payload);
    done(null, user);
  }
}
