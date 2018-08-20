export class Plane {

    private _name: string;

    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }

}
