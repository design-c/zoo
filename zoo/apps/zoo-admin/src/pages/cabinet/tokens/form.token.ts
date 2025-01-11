import { InjectionToken } from '@angular/core';
import { IForm } from '../interfaces/form.interface';

export const FORM_TOKEN: InjectionToken<IForm> = new InjectionToken<IForm>('токен формы');
