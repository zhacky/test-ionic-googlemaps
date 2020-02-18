import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Environment} from '@ionic-native/google-maps';
import {GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, Marker} from '@ionic-native/google-maps/ngx';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    data: any;
    map: GoogleMap;
    currentLat: string;
    currentLong: string;

    constructor(
        private platform: Platform
    ) {

    }

    async ngOnInit() {
        await this.platform.ready();
        await this.loadMap();
    }

    searchMapData(searchString: string) {

    }

    private async loadMap() {
        Environment.setEnv(
            {
                API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyC6zztxezHvFudNIgiEFhYOBFGSzBIQ8Gk',
                API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyC6zztxezHvFudNIgiEFhYOBFGSzBIQ8Gk'
            }
        );

        const mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: 43.0741904,
                    lng: -89.3809802
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = GoogleMaps.create('map_canvas', mapOptions);

        const marker: Marker = this.map.addMarkerSync({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
                lat: 43.0741904,
                lng: -89.3809802
            }
        });

        marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
                alert('clicked');
            });
    }
}
