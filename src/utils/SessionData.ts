import type User from "./User";
import type Picture from "./Picture";

export default class SessionData {
    user: User;
    picture: Picture;

    constructor(user: User, picture: Picture) {
        this.user = user;
        this.picture = picture;    
    }
}