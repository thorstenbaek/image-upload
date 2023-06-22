export default class User {
    id: number;
    email:string;
    name: string;

    constructor(id: number, email:string, name: string) {
        this.id = id;
        this.email = email ?? id;
        this.name = name;        
    }
}