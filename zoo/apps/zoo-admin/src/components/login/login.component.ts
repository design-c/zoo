import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiError, TuiLabel, TuiTextfieldComponent, TuiTextfieldDirective } from '@taiga-ui/core';
import { TuiFieldErrorPipe, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { TuiNativeValidator } from '@taiga-ui/cdk';
import { of } from 'rxjs';
import { AuthService } from '../../services/ auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [
        ReactiveFormsModule,
        TuiTextfieldComponent,
        TuiError,
        TuiFieldErrorPipe,
        CommonModule,
        TuiTextfieldDirective,
        TuiLabel,
        TuiButton,
        TuiNativeValidator
    ],
    providers: [
        tuiValidationErrorsProvider({
            required: 'Это поле обязательно для заполнения',
            minlength: ({ requiredLength }: { requiredLength: string }) => of(`Минимальная длина — ${ requiredLength } символов`),
        })
    ],
})
export class LoginComponent {

    protected readonly loginForm: FormGroup<{ login: FormControl<string | null>, password: FormControl<string | null> }> = new FormGroup({
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    private readonly _authService: AuthService = inject(AuthService);
    private readonly _router: Router = inject(Router);
    private readonly _destroy$: DestroyRef = inject(DestroyRef);

    protected onSubmit() {
        const { login, password } = this.loginForm.value;

        if (!login || !password) {
            return;
        }

        this._authService
            .login(login, password)
            .pipe(
                takeUntilDestroyed(this._destroy$)
            ).subscribe(
            (response) => {
                this._authService.setToken(response.token);
                this._router.navigate(['/cabinet']);
            },
            (error) => {
                console.error('Ошибка при авторизации:', error);
            }
        );
    }
}
