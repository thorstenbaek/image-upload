export default class Picture {
    width: number;
    height: number;
    isSilouette: boolean;
    url: string;

    constructor(url: string, width: number, height: number, isSilouette: boolean = false) {
        this.url = url;
        this.width = width;
        this.height = height;
        this.isSilouette = isSilouette;
    }
}