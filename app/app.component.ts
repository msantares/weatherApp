import { Component } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent {
    name: string;
    cities: any;

    constructor(private http: Http) {
        this.name = '';
        this.cities = (localStorage.getItem('cities')) ?
            JSON.parse(localStorage.getItem('cities')) :
            [];
    }


    addCity(name: string ) {
        let weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lang=ru&units=metric&APPID=7912fc72c98b9e9e6659c3c7095a5614&q='+name;
        return this.http.get(weatherUrl)
            .toPromise()
            .then(response => {
                let cityData = {
                    "name": "" + name + "",
                    "windSpeed": "" + response.json().wind.speed + "",
                    "temperature": "" + response.json().main.temp + ""
                };
                this.cities.push(cityData);
                localStorage.setItem('cities', JSON.stringify(this.cities));
            })
            .catch(this.handleError);
    }


    deleteCity(name: string) {
        this.cities = this.cities.filter(function(cityData){
            return (cityData.name !== name) ? true : false;
        });
        localStorage.setItem('cities', JSON.stringify(this.cities));
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}