import UserModel from "../domain/schemas/user-model/UserModel";
import BaseRepository from "./BaseRepository";

class UserRepository extends BaseRepository {
  constructor() {
    super();
  }

  public model() {
    return UserModel;
  }
}

export default UserRepository;
