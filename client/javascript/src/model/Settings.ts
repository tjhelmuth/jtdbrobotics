export default class Settings {
    readonly address: string;

    constructor(address: string){
        this.address = address;
    }
}

export const EMPTY_SETTINGS = new Settings("");
