export default class Settings {
    readonly address: string;

    constructor(address: string){
        this.address = address;
    }

    persist(){
        localStorage.setItem("settings", JSON.stringify(this));
    }

    static load(): Settings {
        let value = localStorage.getItem("settings");
        if(!value) return EMPTY_SETTINGS;

        let json = JSON.parse(value);
        return new Settings(json.address);
    }
}

export const EMPTY_SETTINGS = new Settings("");
