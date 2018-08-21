export class Plane {

    private _name: string;
    private _seats: number;
    private _manufacturer: string;
    private _range: number;
    private _fuelEfficiency: number;
    private _maintenance: number;
    private _productionYear: string;
    private _price: number;

    public get price(): number {
        return this._price;
    }
    public set price(v: number) {
        this._price = v;
    }

    public get productionYear(): string {
        return this._productionYear;
    }
    public set productionYear(v: string) {
        this._productionYear = v;
    }

    public get maintenance(): number {
        return this._maintenance;
    }
    public set maintenance(v: number) {
        this._maintenance = v;
    }

    public get fuelEfficiency(): number {
        return this._fuelEfficiency;
    }
    public set fuelEfficiency(v: number) {
        this._fuelEfficiency = v;
    }

    public get range(): number {
        return this._range;
    }
    public set range(v: number) {
        this._range = v;
    }

    public get manufacturer(): string {
        return this._manufacturer;
    }
    public set manufacturer(v: string) {
        this._manufacturer = v;
    }

    public get seats(): number {
        return this._seats;
    }
    public set seats(v: number) {
        this._seats = v;
    }

    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }

}
