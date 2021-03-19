# FAMB - Flaide Angular Modal Boxes

### FAMB é um pacote de caixas modais para angular, o pacote contém: alert box, confirm box, input box e progress box.

### Este README contem _anchor links_ para uma melhor experiência leia este documento através do [git-hub](https://github.com/lucas-almeida026/flaide-angular-modal-boxes/blob/main/README.md 'Open with GitHub')

## Importando o módulo
No arquivo `app.module.ts` importe o módule `FAMBModule`: 
```typescript
//...
import { FAMBModule } from 'famb';
//...

@NgModule({
  declarations: [...],
  imports: [
    //...
    FAMBModule
    //...
  ],
  providers: [...],
  //...
})
//...
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

## Utilizando as caixas modais (ex.: AlertBox):
Cada modal box possui um "Controller", uma classe de manipulação do elemento, importe o controller referente a caixa que está utilizando para manipula-la

Para usar a modal box primeiro é necessário chamar o método `config()`, que rece um objeto de configuração como parâmetro. Veja mais sobre [Objetos de configuração](#Objetos-de-configuração).

Cada modal box tem seus próprios objetos de configuração, métodos, parâmetros obrigatórios e eventListeners. Clique [aqui](#Detalhando-cada-modal-box) para ver.

### Ex.: Renderizando uma alert box
```typescript
import { Component } from '@angular/core';
import { FAMBAlertBoxController } from 'famb';
//...

const alertController = new FAMBAlertBoxController()

@Component({...})
export class MyComponent {
  showAlert(): void {
    alertController.config({})
    const observable = alertController.show('Título', 'Descrição da alert box', buttons: {ok: 'Aceito'})
    observable.on('ok', () => goToNextPage())
    observable.on('hide', () => console.log('Usuário recusou'))
  }
}
```

## Detalhando cada modal box
### Métodos e parâmetros obrigatórios:
Todas as modal boxes possuem os métodos `config()`, `show()`, `hide()`.
*Config* serve para configurar o objeto passando informações de comportamento e estilos, *Show* é para renderizar o componente na tela e *Hide* para esconder o componente da tela.
O método `show()` recebe diferêntes parâmetros obrigatórios dependendo de qual modal box ele se refere, veja na lista abaixo. O método `Show()` retorna um `Observable` que por sua vez possue os métodos `emit()`, `emitValue()`, `on()` e `unsubscribe()`. O método `on()` funciona como um event listener, utilize-o para execular as _callbacks_. Veja [os eventos disponíveis para cada modal box](#Eventos-de-cada-modal-box).

### AlertBox:
```typescript
alertController.show(title: string, description: string, buttons?: {
  ok?: string
})
```
### ConfirmBox:
```typescript
confirmController.show(title: string, question: string, buttons?: {
  ok: string,
  cancel: string
})
```
### InputBox:
```typescript
alertController.show(title: string, question: string, buttons?: {
  send: string
})
```
### ProgressBox:
Progress box possui um método a mais `update()` que atualiza o valor da barra de progresso e recebe um valor numérico obrigatório.
```typescript
alertController.show(title: string, buttons?: {
  secPlan: string
})
alertController.update(value: number)
```

## Eventos de cada modal box:
### AlertBox:
```typescript
'hide' | 'close' | 'ok'
 ```
* hide: emitido depois que a modal box é fechada (inclui tempo de animação)
* close: emitido depois que a modal box é fechada (NÃO inclui tempo de animação)
* ok: emitido depois que o usuário clicar no botão OK

<br>

### ConfirmBox:
```typescript
'hide' | 'close' | 'cancel' | 'ok'
 ```
* hide: emitido depois que a modal box é fechada (inclui tempo de animação)
* close: emitido depois que a modal box é fechada (NÃO inclui tempo de animação)
* ok: emitido depois que o usuário clicar no botão OK
* cancel: emitido depois que o usuário clicar no botão CANCEL

<br>

### InputBox:
```typescript
'hide' | 'close' | 'send' | 'keyup' | 'keypress' | 'keydown'
```
* hide: emitido depois que a modal box é fechada (inclui tempo de animação)
* close: emitido depois que a modal box é fechada (NÃO inclui tempo de animação)
* send: emitido depois que o usuário clicar no botão SEND
* keyup: emitido em todo evento _keyup_ do input
* keypress: emitido em todo evento _keypress_ do input
* keydown: emitido em todo evento _keydown_ do input

<br>

### ProgressBox:
```typescript
'hide' | 'close' | 'secPlan' | 'finish'
 ```
* hide: emitido depois que a modal box é fechada (inclui tempo de animação)
* close: emitido depois que a modal box é fechada (NÃO inclui tempo de animação)
* secPlan: emitido depois que o usuário clicar no botão SECOND PLAN
* finish: Emitido quando a barra de progresso chegar em 100%


### Objetos de configuração:
Objetos de configuração são opcionais e definem alguns valores para as modal boxes, além de permitir a estilização dos elementos via typescript.
### AlertBox:
```typescript
interface AlertConfigs {
  animationTime?: number,
  bgTransparencyRate?: string,
  hideOnClickBackground?: boolean,
  alertBoxStyles?: {
    width?: string,
    maxWidth?: string,
    minHeight?: string,
    backgroundColor?: string,
    border?: string,
    borderRadius?: string,
    title?: {
      fontSize?: string,
      color?: string,
      textAlign?: textAlign,
    }
    description?: {
      fontSize?: string,
      color?: string,
      minHeight?: string,
      textAlign?: 'center' | 'left' | 'right' | 'justify',
    }
    okButton?: {
      width?: string,
      maxWidth?: string,
      padding?: string,
      fontSize?: string,
      color?: string,
      backgroundColor?: string,
      border?: string,
      borderRadius?: string,
      opacity?: string,
      hover?: {
        color?: string,
        backgroundColor?: string,
        opacity?: string
      }
    }
  }
}
```
### ConfirmBox:
```typescript
interface ConfirmConfigs {
  animationTime?: number,
  bgTransparencyRate?: string,
  hideOnClickBackground?: boolean,
  confirmBoxStyles?: {
    width?: string,
    maxWidth?: string,
    minHeight?: string,
    backgroundColor?: string,
    border?: string,
    borderRadius?: string,
    title?: {
      fontSize?: string,
      color?: string,
      textAlign?: textAlign,
    },
    question?: {
      fontSize?: string,
      color?: string,
      minHeight?: string,
      textAlign?: 'center' | 'left' | 'right' | 'justify',
    }
    okButton?: {
      width?: string,
      maxWidth?: string,
      padding?: string,
      fontSize?: string,
      color?: string,
      backgroundColor?: string,
      border?: string,
      borderRadius?: string,
      opacity?: string,
      hover?: {
        color?: string,
        backgroundColor?: string,
        opacity?: string
      }
    }
    cancelButton?: {
      width?: string,
      maxWidth?: string,
      padding?: string,
      fontSize?: string,
      color?: string,
      backgroundColor?: string,
      border?: string,
      borderRadius?: string,
      opacity?: string,
      hover?: {
        color?: string,
        backgroundColor?: string,
        opacity?: string
      }
    }
  }
}
```

### InputBox:
```typescript
interface InputConfigs {
  animationTime?: number,
  bgTransparencyRate?: string,
  hideOnClickBackground?: boolean,
  inputBoxStyles?: {
    width?: string,
    maxWidth?: string,
    minHeight?: string,
    backgroundColor?: string,
    border?: string,
    borderRadius?: string,
    title?: {
      fontSize?: string,
      color?: string,
      textAlign?: textAlign,
    }
    question?: {
      fontSize?: string,
      color?: string,
      minHeight?: string,
      textAlign?: 'center' | 'left' | 'right' | 'justify',
    }
    sendButton?: {
      width?: string,
      maxWidth?: string,
      padding?: string,
      fontSize?: string,
      color?: string,
      backgroundColor?: string,
      border?: string,
      borderRadius?: string,
      opacity?: string,
      hover?: {
        color?: string,
        backgroundColor?: string,
        opacity?: string
      }
    }
    input?: {
      width?: string,
      maxWidth?: string,
      padding?: string,
      color?: string,
      fontSize?: string,
      border?: string,
      borderRadius?: string,
      placeholderText?: string,
    }
  }
}
```
### ProgressBox: 
```typescript
interface ProgressConfigs {
  animationTime?: number,
  bgTransparencyRate?: string,
  hideOnClickBackground?: boolean,
  progressBoxStyles?: {
    width?: string,
    maxWidth?: string,
    minHeight?: string,
    backgroundColor?: string,
    border?: string,
    borderRadius?: string,
    title?: {
      fontSize?: string,
      color?: string,
      textAlign?: textAlign,
    }
    progressBar?: {
      width?: string,
      maxWidth?: string,
      height?: string,
      border?: string,
      progressFill?:{
        backgroundColor?: string,
        height?: string,
      },
      progressValue?:{
        fontSize?: string
        position?: 'insideLeft' | 'insideRight' | 'bellowLeft' | 'bellowRight',
        backgroudColor?: string,
        color?: string,
      }
    }
    secPlanBtn?: {
      width?: string,
      maxWidth?: string,
      padding?: string,
      fontSize?: string,
      color?: string,
      backgroundColor?: string,
      border?: string,
      borderRadius?: string,
      opacity?: string,
      hover?: {
        color?: string,
        backgroundColor?: string,
        opacity?: string
      }
    }
  }
}
```
