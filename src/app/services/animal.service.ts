import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
/** esto nos va a dar un método que nos permite recoger los valores que da una peticion ajax */
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';
import { GLOBAL} from './global';

/**Para poder inyectar el servicio dentro de componente y dentro de diferentes sitios */
@Injectable()
export class AnimalService{
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }


    addAnimal( token, animal){
        const params = JSON.stringify(animal);
        const headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'animal', params, {headers : headers})
                .map(res => res.json());
    }

    getAnimals(){
        return this._http.get(this.url + 'animals').map( res => res.json());
    }

    getAnimal(id){
        return this._http.get(this.url + 'animal/' + id).map( res => res.json());
    }

    editAnimal(token, id, animal){
        const params = JSON.stringify(animal);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.put(this.url + 'animal/' + id, params, {headers: headers})
                         .map(res => res.json());
    }

    deleteAnimal( token, id){
        const headers = new Headers({
            'Content-Type': 'Application/json',
            'Authorization': token
        });

        const options = new RequestOptions({headers: headers});
        return this._http.delete(this.url + 'animal/' + id, options)
                    .map(res => res.json());
    }
}
