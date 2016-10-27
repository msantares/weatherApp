import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent {
    name: string;
    cities: any;

    constructor() {
        this.name = '';
        this.cities = [];
    }


    addCity(name: string ) {
        this.cities.push(name);
    }


    deleteCity(name: string) {
        let index = this.cities.indexOf(name);
        if(index > -1)
            this.cities.splice(index, 1);
    }

}