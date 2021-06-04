# FAMB - Flaide Angular Modal Boxes

FAMB é um pacote de caixas modais para angular, o pacote contém: alert box, confirm box, input box e progress box.


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

## Renderizando os componentes
Você pode usar as caixas modais de maneira global ou importar uma a uma em cada página.

### Usando de maneira global
No arquivo `app.component.html` declare o componente global:
```html
<famb-global></famb-global>
<router-outlet><router-outlet>
```
Ou se prefirir declare apenas as que vai utilizar:
```html
<famb-alert-box></famb-alert-box>
<famb-confirm-box></famb-confirm-box>
<famb-input-box></famb-input-box>
<famb-progress-box></famb-progress-box>
<router-outlet><router-outlet>
```
### Usando de maneira local
Importe apenas as caixas modais que de sejar no arquivo que desejar, exemplo `my-component.hml`:
```html
<famb-alert-box></famb-alert-box>
```

## Renderizando uma alert box (ex.: AlertBox):
No arquivo `.ts` do seu componente import o serviço `FAMB` e chame o método `show()` de `alert` passando as propriedades `title` e `description` (obrigatórias)
```typescript
//...
import { FAMB } from 'famb';
//...
@Component({
  selector: 'app-meu-componente',
  templateUrl: './meu-componente.html',
  styleUrls: ['./meu-componente.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(
    private FAMB: FAMB
  ){}
  ngAfterViewInit() {    
    this.FAMB.alert.show('message title', 'message description')
  }
}
```

## IMPORTANTE:
### A caixa modal de barra de progresso possui um método a mais:
Assim como as outras a caixa modal `<famb-progress-box>` possui os métos `show()` e `hide()`, mas além deles ela possui o método `update()` que é utilizado para atualizar o valor percentual da parra de progresso.
Exemplo:
```typescript
ngAfterViewInit() {
  let value = 0   
  this.FAMB.progress.show('testing progress bar')
  setInterval(() => {
    this.FAMB.progress.update(value)
    value += 10
  }, 500)
}
```
Resultado:
[![gv-vid.gif](https://i.postimg.cc/N09YKMy6/gv-vid.gif)](https://postimg.cc/rdk7bqNs)
<br>

## Configurações possíveis (geral)
Configure suas caixas modais de maneira simples utilizando o método `configAllModalBoxes`.
Clique <a href="#detalhando-cada-modal-box">aqui</a> para ver as configurções expecíficas de cada modal box
IMPORTANTE: Defina as cofigurações das caixas modais antes de renderiza-las na tela!
```typescript
//Descrevendo o método FAMB.configAllModalBoxes(<obj>)
type configAllModalBoxes = (obj: GeneralConfigObj) => void
type GeneralConfigObj = {
  animationTime?: number, //Tempo de animação de todas as caixas modais
  bgTransparencyRate?: string, //Taxa de transparência do fundo - de 0 a 1
  hideOnClickBackground?: boolean, //Fecha a caixa modal se o usuário clicar no fundo - padrão: false
  styles?: {
    box?: CSS.StandardProperties //Estiliza a box de acordo com as propriedades css atribuidas
  }
}
```

## Definindo valores de cores globais
Defina "constantes" que armazenam códigos hexadecimais de cores.
IMPORTANTE: Defina as cofigurações de cores antes de renderizar as caixas modais na tela!
```typescript
ngAfterViewInit() {    
  this.FAMB.configGlobalColors({
    primaryColor: '#f0f',
    transparentPrimaryColor: '#f0fa',
    secondColor: '#ffffff',
    transparentWhite: '#ffffffaa'
  })
  //...
}
```

## Usando os valores de cores globais
Para referenciar uma cor definida globalmente basta escrever o nome dela entre aspas no valor da propriedade css.
```typescript
ngAfterViewInit() {    
  this.FAMB.configGlobalColors({
    primaryColor: '#f0f',
    semiBlack: '#3b3b3b',
  })
  this.FAMB.configAlertBox({
    styles: {
      box: {
        backgroundColor: 'primaryColor'
      },
      title: {
        color: 'semiBlack'
      }
    }
  })
  //...
}
```

## Observando eventos
O método `show()` de todas as caixas modais retorna um objeto do tipo `Observable`, para se observar o objeto utilize o método `on(<event>)` e passe o `evento: string`.
```typescript
this.FAMB.alert.show('message title', 'message description').on('close', () => console.log('alert closed'))
```
Existem duas maneiras de observar mais de um evento ao mesmo tempo
1. Salvando o objeto observável em uma váriável:
  ```typescript
    const observable = this.FAMB.alert.show('message title', 'message description')
    observable.on('close', () => console.log('alert closed'))
    observable.on('ok', () => console.log('ok'))
  ```
2. Encadeando inscrições:
  ```typescript
  this.FAMB.alert.show('message title', 'message description')
    .on('close', () => console.log('alert closed'))
    .on('ok', () => console.log('ok'))
  ```


## Detalhando cada modal box
Cada modal box possiu parâmetros, funções, eventos observáveis, interface de modificações e método de configuração específicos.
Veja a seguir a descrição de todas estas propriedades agrupadas por caixa modal.
Índice: <a href="#alertbox">AlertBox</a> - <a href="#confirmbox">ConfirmBox</a> - <a href="#inputbox">InputBox</a> - <a href="#progressbox">ProgressBox</a>

### AlertBox:
#### Método de configuração e interface de modificações:
```typescript
type FAMBAlertBoxConfig = {
  animationTime?: number,
  bgTransparencyRate?: string,
  hideOnClickBackground?: boolean,
  styles?: {
    box?: CSS.StandardProperties,
    title?: CSS.StandardProperties,
    description?: CSS.StandardProperties,
    okButton?: CSS.StandardProperties,
  }
}
type FAMB.configAlertBox = (obj: FAMBAlertBoxConfig) => void
//Exemplo:
this.FAMB.configAlertBox({
  animationTime: 300,
  hideOnClickBackground: true,
  styles: {
    box: {
      backgroundColor: 'black'
    }
  }
})
```
#### Funções e parâmetros:
```typescript
type AlertOptions = {okButtonText?: string}
type IAlertModal = {
  show: (title: string, description: string, options?: AlertOptions) => IReturnableObservable<AlertEvents>,
  hide: () => void
}
```
#### Eventos observáveis
```typescript
type AlertEvents = 'hide' | 'close' | 'ok'
```
* hide: emitido ao fechar caixa modal (inclui tempo de animação)
* close: emitido fechar caixa modal (NÃO inclui tempo de animação)
* ok: emitido ao clicar no botão OK


### ConfirmBox:
#### Método de configuração e interface de modificações:
```typescript
type FAMBConfirmBoxConfig = {
  animationTime?: number,
  bgTransparencyRate?: string,
  hideOnClickBackground?: boolean,
  styles?: {
    box?: CSS.StandardProperties,
    title?: CSS.StandardProperties,
    question?: CSS.StandardProperties,
    okButton?: CSS.StandardProperties,
    cancelButton?: CSS.StandardProperties,
  }
}
type FAMB.configConfirmBox = (obj: FAMBConfirmBoxConfig) => void
//Exemplo:
this.FAMB.configConfirmBox({
  animationTime: 300,
  styles: {
    box: {
      backgroundColor: 'black'
    }
  }
})
```
#### Funções e parâmetros:
```typescript
type ConfirmOptions = {okButtonText?: string, cancelButtonText: string}
type IConfirmModal = {
  show: (title: string, description: string) => IReturnableObservable<ConfirmEvents>,
  hide: () => void
}
```
#### Eventos observáveis
```typescript
type AlertEvents = 'hide' | 'close' | 'cancel' | 'ok'
```
* hide: emitido ao fechar caixa modal (inclui tempo de animação)
* close: emitido fechar caixa modal (NÃO inclui tempo de animação)
* ok: emitido ao clicar no botão OK
* cancel: emitido ao clicar no botão CANCEL


### InputBox:
#### Método de configuração e interface de modificações:
```typescript
type FAMBInputBoxConfig = {
  animationTime?: number,
  bgTransparencyRate?: string,
  hideOnClickBackground?: boolean,
  styles?: {
    box?: CSS.StandardProperties,
    title?: CSS.StandardProperties,
    description?: CSS.StandardProperties,
    sendButton?: CSS.StandardProperties,
    input?: CSS.StandardProperties,
  }
}
type FAMB.configInputBox = (obj: FAMBInputBoxConfig) => void
//Exemplo:
this.FAMB.configInputBox({
  animationTime: 300,
  styles: {
    box: {
      backgroundColor: 'black'
    }
  }
})
```
#### Funções e parâmetros:
```typescript
type InputOptions = {sendButtonText?: string, inputPlaceholder?: string, pressingEnterClicksTheButton?: boolean}
type IInputModal = {
  show: (title: string, description: string, options?: InputOptions) => IReturnableObservable<InputEvents>,
  hide: () => void
}}
```
#### Eventos observáveis
```typescript
type InputEvents = 'hide' | 'close' | 'send' | 'keyup' | 'keypress' | 'keydown'
```
* hide: emitido ao fechar caixa modal (inclui tempo de animação)
* close: emitido fechar caixa modal (NÃO inclui tempo de animação)
* send: emitido ao clicar no botão SEND
* keyup: emitido em todo evento _keyup_ do input
* keypress: emitido em todo evento _keypress_ do input
* keydown: emitido em todo evento _keydown_ do input



### ProgressBox:
#### Método de configuração e interface de modificações:
```typescript
type FAMBProgressBoxConfig = {
  animationTime?: number,
  bgTransparencyRate?: string,
  hideOnClickBackground?: boolean,
  closeOnFinish?: boolean,
  styles?: {
    box?: CSS.StandardProperties,
    bar?: CSS.StandardProperties,
    fill?: CSS.StandardProperties,
    value?: CSS.StandardProperties, // Tutilize 'insideLeft' | 'insideRight' | 'bellowLeft' | 'bellowRight' para determinar a posição da label
    title?: CSS.StandardProperties,
    secondPlanButton?: CSS.StandardProperties,
  }
}
type FAMB.configProgressBox = (obj: FAMBProgressBoxConfig) => void
//Exemplo:
this.FAMB.configProgressBox({
  animationTime: 300,
  styles: {
    box: {
      backgroundColor: 'black'
    }
  }
})
```
#### Funções e parâmetros:
```typescript
type ProgressOptions = {secondPlanButtonText?: string, labelValuePosition?: 'insideLeft' | 'insideRight' | 'bellowLeft' | 'bellowRight'}
type IProgressModal = {
  show: (title: string, options?: ProgressOptions) => IReturnableObservable<ProgressEvents>,
  hide: () => void,
  update: (value: number) => void
}
```
#### Eventos observáveis
```typescript
type ProgressEvents = 'hide' | 'close' | 'secondPlan' | 'finish'
```
* hide: emitido ao fechar caixa modal (inclui tempo de animação)
* close: emitido fechar caixa modal (NÃO inclui tempo de animação)
* secondPlan: emitido so clicar no botão SECOND PLAN
* finish: Emitido quando a barra de progresso chega em 100%
