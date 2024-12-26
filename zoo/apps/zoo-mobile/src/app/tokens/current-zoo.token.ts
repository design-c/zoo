import { InjectionToken } from '@angular/core';
import { IZoo } from '../services/zoo-request.service';
import { Observable } from 'rxjs';

export const CURRENT_ZOO_TOKEN = new InjectionToken<Observable<IZoo>>('Current zoo');
