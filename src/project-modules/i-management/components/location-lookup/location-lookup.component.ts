import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'location-lookup',
  templateUrl: './location-lookup.component.html',
  styleUrls: ['./location-lookup.component.css']
})
export class LocationLookupComponent implements OnInit {
  
  
  constructor(private appService: AppService, private _formBuilder: FormBuilder){}
  
  
  
  ngOnInit() {
    this.appService.updateCurrentModule('restock');
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterGroup(value))
    );
    }

    private _filterGroup(value: string): StateGroup[] {
      if (value) {
        return this.stateGroups
          .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
          .filter(group => group.names.length > 0);
      }
  
      return this.stateGroups;
    }

    stateForm: FormGroup = this._formBuilder.group({
      stateGroup: '',
    });
  
    stateGroups: StateGroup[] = [{
      letter: 'A',
      names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']
    }, {
      letter: 'C',
      names: ['California', 'Colorado', 'Connecticut']
    }, {
      letter: 'D',
      names: ['Delaware']
    }, {
      letter: 'F',
      names: ['Florida']
    }, {
      letter: 'G',
      names: ['Georgia']
    }, {
      letter: 'H',
      names: ['Hawaii']
    }, {
      letter: 'I',
      names: ['Idaho', 'Illinois', 'Indiana', 'Iowa']
    }, {
      letter: 'K',
      names: ['Kansas', 'Kentucky']
    }, {
      letter: 'L',
      names: ['Louisiana']
    }, {
      letter: 'M',
      names: ['Maine', 'Maryland', 'Massachusetts', 'Michigan',
        'Minnesota', 'Mississippi', 'Missouri', 'Montana']
    }, {
      letter: 'N',
      names: ['Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
        'New Mexico', 'New York', 'North Carolina', 'North Dakota']
    }, {
      letter: 'O',
      names: ['Ohio', 'Oklahoma', 'Oregon']
    }, {
      letter: 'P',
      names: ['Pennsylvania']
    }, {
      letter: 'R',
      names: ['Rhode Island']
    }, {
      letter: 'S',
      names: ['South Carolina', 'South Dakota']
    }, {
      letter: 'T',
      names: ['Tennessee', 'Texas']
    }, {
      letter: 'U',
      names: ['Utah']
    }, {
      letter: 'V',
      names: ['Vermont', 'Virginia']
    }, {
      letter: 'W',
      names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    }];
  
    stateGroupOptions: Observable<StateGroup[]>;
}


export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};