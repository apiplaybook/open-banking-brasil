Feito com ♥ pelo time de Developer Experience da API Playbook [fale conosco](https://www.apiplaybook.com/).

Licença Gratuita.

# Open Banking Brasil

No dia 1º de fevereiro de 2021, foi implementado o Open Banking no Brasil. Ele promete revolucionar o mercado financeiro, pois com ele será possível o compartilhamento de informações bancárias entre diferentes instituições.

A primeira fase do Open Banking Brasil disponibiliza informações sobre as instituições financeiras, como taxas e tarifas cobradas por serviços prestados pelos bancos. Neste primeiro momento, isso permite que o cliente possa comparar as instituições e que escolha a melhor opção para o seu caso, incentivando a competição por serviços e crédito mais barato e de melhor qualidade.

Essas informações públicas são disponibilizadas através de _RESTful APIs_. Para mais informações sobre as APIs, consulte esta [documentação](https://openbanking-brasil.github.io/areadesenvolvedor/).

## Como realizar as consultas às APIs

As APIs disponíveis, na primeira fase, possuem um funcionamento muito simples. Basta realizar uma requisição `GET` ao _URI_ da API desejada e será retornada a resposta em um `JSON`

Os URIs das APIs de diferentes bancos seguem o mesmo princípio:

https://**url-base-disponibilizado-pelo-banco**/open-banking/products-services/v1/**api**

O URL base fica disponível no portal dev da instituição financeira e **normalmente** seguem o padrão https://api.**banco**.com

Algumas APIs podem sofrer com um problema de acesso bloqueado pelo `CORS` (_Cross-origin resource sharing_). Se isso ocorrer, será necessário o uso de um _proxy_ para intermediar a requisição à API que está sofrendo com este problema.

Para mais informações sobre as APIs do **Open Banking Brasil**, consulte esta [documentação](https://openbanking-brasil.github.io/areadesenvolvedor/).

## `Contas pessoa física`

A API de contas pessoa física leva o nome de **`personal-accounts`** e retorna as formas de movimentações e suas tarifas, termos e condições de contrato, entre outras coisas.

`GET` https://**url-base-disponibilizado-pelo-banco**/open-banking/products-services/v1/**personal-accounts**

## `Empréstimo pessoa física`

A API de empréstimo pessoa física leva o nome de **`personal-loans`** e retorna as taxas cobradas para os diferentes tipos de empréstimo, termos e condições de contrato e outras informações sobre empréstimo para pessoa física.

`GET` https://**url-base-disponibilizado-pelo-banco**/open-banking/products-services/v1/**personal-loans**

## `Empréstimo pessoa jurídica`

A API de empréstimo pessoa jurpidica leva o nome de **`business-loans`** e retorna as taxas cobradas para os diferentes tipos de empréstimo, termos e condições de contrato e outras informações sobre empréstimo para pessoa jurídica.

`GET` https://**url-base-disponibilizado-pelo-banco**/open-banking/products-services/v1/**business-loans**
