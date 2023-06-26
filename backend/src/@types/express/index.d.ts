import { MongoAbility } from "@casl/ability";
import { IUser } from "../user";
declare global {
    namespace Express {
        export interface Request {
            user?: User;
            ability: MongoAbility
        }
    }
}
