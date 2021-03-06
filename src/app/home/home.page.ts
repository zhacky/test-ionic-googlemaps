import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Environment} from '@ionic-native/google-maps';
import {GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, Marker} from '@ionic-native/google-maps/ngx';
import {Place} from './place';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    hasFound: boolean;
    data: any;
    map: GoogleMap;
    places: Place[];
    selected: Place[];
    currentLat: string;
    currentLong: string;

    constructor(
        private platform: Platform
    ) {

    }

    async ngOnInit() {
        await this.platform.ready();

        fetch('./assets/places_dataset.json').then(res => res.json())
            .then(json => {
                this.data = json.data;
                console.log('data: ');
                // console.log(this.data.listPlacesString2);
                this.places = JSON.parse(this.data.listPlacesString2);
                console.log(this.places);
                this.loadMap([]);
                console.log('has loaded');
            });


    }

    async searchMapData(searchString: string) {
        if (searchString.length < 3) {
            return;
        }
        console.log(`Searching... ${searchString}`);
        this.selected = this.places.filter(({name}) => name.includes(searchString));
        console.log(this.selected);
        if (this.selected === undefined || this.selected.length <= 0) {
            this.hasFound = false;
            return;
        }
        this.hasFound = true;
        await this.loadCurrent(this.selected);
    }

    private async loadMap(selected: Place[]) {
        Environment.setEnv(
            {
                API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyC6zztxezHvFudNIgiEFhYOBFGSzBIQ8Gk',
                API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyC6zztxezHvFudNIgiEFhYOBFGSzBIQ8Gk',
                API_KEY_FOR_ANDROID: 'AIzaSyC6zztxezHvFudNIgiEFhYOBFGSzBIQ8Gk',
                GOOGLE_MAPS_ANDROID_API_KEY: 'AIzaSyC6zztxezHvFudNIgiEFhYOBFGSzBIQ8Gk'
            }
        );

        const defaultOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: this.places[0].lat,
                    lng: this.places[0].long
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = GoogleMaps.create('map_canvas', defaultOptions);
    }

    private loadCurrent(selected: Place[]) {
        if (selected === undefined || selected.length <= 0) {
            return;
        }

        const mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: selected[0].lat,
                    lng: selected[0].long
                },
                zoom: 18,
                tilt: 30
            }
        };
        selected.forEach(place => {
            const htmlMsg = `<strong>${place.name}</strong><br/><br/><strong>Address:</strong> ${place.address}<br/><br/><strong>Rating:</strong> ${place.rating}<br/><br/>Geo: ${place.lat},${place.long}`;
            const msg = `${place.name}\nAddress: ${place.address}\nRating: ${place.rating}\nGeo: ${place.lat},${place.long}`;
            const marker: Marker = this.map.addMarkerSync({
                title: htmlMsg,
                icon: 'blue',
                animation: 'DROP',
                position: {
                    lat: place.lat,
                    lng: place.long
                }
            });
            marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {

                    alert(msg);
                });
        });
        this.map.setOptions(mapOptions);
    }
}
