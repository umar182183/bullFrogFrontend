import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StockInventoryService {

  constructor(private http: HttpClient) {
    
  }

  private currentComonentSource = new Subject<string>();
  currentComponent$ = this.currentComonentSource.asObservable();

  updateCurrentComponent(currentModule: string) {
      this.currentComonentSource.next(currentModule);
  }

}
