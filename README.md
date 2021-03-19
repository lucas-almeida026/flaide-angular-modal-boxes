# FAMB - Flaide Angular Modal Boxes

### FAMB é um pacote de caixas modais para angular, o pacote contém: alert box, confirm box, input box e progress box.

### Este README contem _anchor links_ para uma melhor experiência leia este documento através do [git-hub](https://github.com/lucas-almeida026/flaide-angular-modal-boxes/blob/main/README.md 'Open with GitHub')

## Importando o módulo
No arquivo `app.module.ts` importe o módule `FAMBModule`: 
```
...
import { FAMBModule } from 'famb';
...

@NgModule({
  declarations: [...],
  imports: [
    ...
    FAMBModule
    ...
  ],
  providers: [...],
  ...
})
...
```

## Renderizando os components
### Não é necessário utilizar as tags HTML toda vez que for utilizar as caixas modais do pacote FAMB, escreva as tags HTML uma única vez e tenha as caixas modais disponíveis na aplicação inteira.
No arquivo `app.component.html` declare as caixas modais que irá utilziar em toda a aplicação:
```html
<famb-alert-box></famb-alert-box>
<famb-confirm-box></famb-confirm-box>
<famb-input-box></famb-input-box>
<famb-progress-box></famb-progress-box>
<router-outlet><router-outlet>
```

## Utilizando AlertBox:
Cada caixa modal possui um "Controller", uma classe de manipulação do elemento, importe o controller referente a caixa que está utilizando para manipula-la

Para usar a caixa modal primeiro é necessário chamar o método `config()`, que rece um objeto de configuração como parâmetro. 
```typescript
import { Component } from '@angular/core';
import { FAMBAlertBoxController } from 'famb';

const alertController = new FAMBAlertBoxController()

@Component({...})
export class MyComponent {
  showAlert(): void {

  }
}
```
