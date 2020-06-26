import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';


@Injectable()
export class CarService {

    constructor(private http: HttpClient) {}

    getCarsLarge() {
        return this.http.get('showcase/resources/data/cars-large.json')
            .toPromise()
            .then((res: any) => <Car[]>res.json().data)
            .then(data => { return data; });
    }
}