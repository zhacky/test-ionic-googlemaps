export class Place {

    private mPlaceId: string;
    private mName: string;
    private mLat: number;
    private mLong: number;
    private mRating: number;
    private mAddress: string;


    constructor(mPlaceId: string, mName: string, mLat: number, mLong: number, mRating: number, mAddress: string) {
        this.mPlaceId = mPlaceId;
        this.mName = mName;
        this.mLat = mLat;
        this.mLong = mLong;
        this.mRating = mRating;
        this.mAddress = mAddress;
    }

    get placeId(): string {
        return this.mPlaceId;
    }

    set placeId(value: string) {
        this.mPlaceId = value;
    }

    get name(): string {
        return this.mName;
    }

    set name(value: string) {
        this.mName = value;
    }

    get lat(): number {
        return this.mLat;
    }

    set lat(value: number) {
        this.mLat = value;
    }

    get long(): number {
        return this.mLong;
    }

    set long(value: number) {
        this.mLong = value;
    }

    get rating(): number {
        return this.mRating;
    }

    set rating(value: number) {
        this.mRating = value;
    }

    get address(): string {
        return this.mAddress;
    }

    set address(value: string) {
        this.mAddress = value;
    }
}
