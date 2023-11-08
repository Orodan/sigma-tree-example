import { of } from 'rxjs';
import brochures from '../data/brochures.json';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrochureService {

  getBrochures() {
    return of(brochures.map(brochure => ({
      name: brochure.libelle, code: brochure.id
    })));
  }
}
