import { MatSnackBar as _snackbar } from "@angular/material/snack-bar";

export class MyErrorHandler {
    validatorError = (error: any): string => {
        if (error?.required) return 'Campo obrigatório';
        if (error?.email) return 'Formato de e-mail inválido';
        if (error?.minlength) return 'Tamanho mínimo não alcançado';

        return 'Erro não definido';
    }

    apiErrorMessage = (errorMessage: string) => {
        switch (errorMessage) {
            case 'Error: Incorrect password':
                return this.sendErrorMessage('Senha incorreta.');
                
            case 'Error: User not found':
                return this.sendErrorMessage('Usuário não encontrado.');
                
            case 'Project does not have authorization':
                return this.sendErrorMessage('Sem autorização para este aplicativo.');
                
            default:
                return this.sendErrorMessage(errorMessage);
        }
    }

    sendErrorMessage = (errorMessage: string) => {
        _snackbar.prototype.open(errorMessage, undefined, {
            duration: 4 * 1000,
        });
    }
}