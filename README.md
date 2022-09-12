# DrivenPass

### Rota: POST ```/auth/sign-up```
  - **Função**: Registro de usuários;
  - **Request:** body no formato:
```json
{
  "email": "teste@email.com", //string (email)
  "password": "1234567890" //string (min 10 dígitos)
}
```
  - **StatusCodes**:
    - 201: sucesso na criação;
    - 409: email já cadastrado;
    - 422: erro no formato do body.


### Rota: POST ```/auth/sign-in```
  - **Função**: Login de usuários;
  - **Request:** body no formato:
```json
{
  "email": "teste@email.com", //string (email)
  "password": "1234567890" //string (min 10 dígitos)
}
```
- **Retorno:**
```json
{
  "token": "token" //token gerado por jwt
}
```
  - **StatusCodes**:
    - 200: sucesso;
    - 401: email ou senha incorretos;
    - 422: erro no formato do body.
    

### Rota: POST ```/credentials/create```
  - **Função**: Cria nova credencial;
  - Rota autenticada com um header do tipo **"Authorization"** no formato **"Bearer token"**;
  - **Request:** body no formato:
```json
{
  "title": "Credencial 1", //string
  "url": "https://www.facebook.com", //string (url)
  "username": "teste", //string
  "password": "123456" //string
}
```
  - **StatusCodes**:
    - 201: sucesso na criação;
    - 401: token inválido;
    - 404: usuário não encontrado (verificação do token);
    - 409: titulo já existente;
    - 422: erro no formato do body.


### Rota: GET ```/credentials```
  - **Função**: Busca todas as credenciais pertencentes ao usuário;
  - Rota autenticada com um header do tipo **"Authorization"** no formato **"Bearer token"**;
  - **Retorno:**
```json
[
  {
    "title": "Credencial 1",
    "url": "https://www.facebook.com",
    "username": "teste1",
    "password": "123456"
  },
  {
    "title": "Credencial 2",
    "url": "https://www.facebook.com",
    "username": "teste2",
    "password": "123456"
  }
]
```
  - **StatusCodes**:
    - 200: sucesso;
    - 401: token inválido;
    - 404: usuário não encontrado (verificação do token).

### Rota: GET ```/credentials/:credentialId```
  - **Função**: Busca uma credencial específica pertencente ao usuário;
  - Rota autenticada com um header do tipo **"Authorization"** no formato **"Bearer token"**;
  - **Retorno:**
```json
{
  "title": "Credencial 1",
  "url": "https://www.facebook.com",
  "username": "teste1",
  "password": "123456"
}
```
  - **StatusCodes**:
    - 200: sucesso;
    - 401: token inválido ou credencial não pertencente ao usuário;
    - 404: usuário não encontrado (verificação do token) ou credencial não encontrada.


### Rota: DELETE ```/credentials/delete/:credentialId```
  - **Função**: Deleta uma credencial específica pertencente ao usuário;
  - Rota autenticada com um header do tipo **"Authorization"** no formato **"Bearer token"**;
  - **StatusCodes**:
    - 200: sucesso;
    - 401: token inválido ou credencial não pertencente ao usuário;
    - 404: usuário não encontrado (verificação do token) ou credencial não encontrada.


### Rota: POST ```/notes/create```
  - **Função**: Cria nova nota segura;
  - Rota autenticada com um header do tipo **"Authorization"** no formato **"Bearer token"**;
  - **Request:** body no formato:
```json
{
  "title": "Nota 1", //string (max 50 caracteres)
  "description": "Conteúdo da nota" //string (max 1000 caracteres)
}
```
  - **StatusCodes**:
    - 201: sucesso na criação;
    - 401: token inválido;
    - 404: usuário não encontrado (verificação do token);
    - 409: titulo já existente;
    - 422: erro no formato do body.


### Rota: GET ```/notes```
  - **Função**: Busca todas as notas seguras pertencentes ao usuário;
  - Rota autenticada com um header do tipo **"Authorization"** no formato **"Bearer token"**;
  - **Retorno:**
```json
[
  {
  "title": "Nota 1",
  "description": "Conteúdo da nota"
  },
  {
  "title": "Nota 2",
  "description": "Conteúdo da nota"
  }
]
```
  - **StatusCodes**:
    - 200: sucesso;
    - 401: token inválido;
    - 404: usuário não encontrado (verificação do token).

### Rota: GET ```/notes/:noteId```
  - **Função**: Busca uma nota segura específica pertencente ao usuário;
  - Rota autenticada com um header do tipo **"Authorization"** no formato **"Bearer token"**;
  - **Retorno:**
```json
{
  "title": "Nota 1",
  "description": "Conteúdo da nota"
}
```
  - **StatusCodes**:
    - 200: sucesso;
    - 401: token inválido ou nota segura não pertencente ao usuário;
    - 404: usuário não encontrado (verificação do token) ou nota segura não encontrada.


### Rota: DELETE ```/notes/delete/:noteId```
  - **Função**: Deleta uma nota segura específica pertencente ao usuário;
  - Rota autenticada com um header do tipo **"Authorization"** no formato **"Bearer token"**;
  - **StatusCodes**:
    - 200: sucesso;
    - 401: token inválido ou nota segura não pertencente ao usuário;
    - 404: usuário não encontrado (verificação do token) ou nota segura não encontrada.


### Rota: POST ```/cards/create```
  - **Função**: Cria novo cartão;
  - Rota autenticada com um header do tipo **"Authorization"** no formato **"Bearer token"**;
  - **Request:** body no formato:
```json
{
  "title": "Cartão 1", //string
  "number": "5472974396484296", //string (16 dígitos)
  "cardHolderName": "MARIA SILVA", //string
  "securityCode": "860", //string (3 dígitos)
  "expirationDate": "09/27", //string (formato: MM/YY)
  "password": "1234", //string
  "isVirtual": false, //boolean
  "type": "credit" //string (válidos: credit, debit, both)
}
```
  - **StatusCodes**:
    - 201: sucesso na criação;
    - 401: token inválido;
    - 404: usuário não encontrado (verificação do token);
    - 409: titulo já existente;
    - 422: erro no formato do body.


### Rota: GET ```/cards```
  - **Função**: Busca todos os cartões pertencentes ao usuário;
  - Rota autenticada com um header do tipo **"Authorization"** no formato **"Bearer token"**;
  - **Retorno:**
```json
[
  {
    "title": "Cartão 1", 
    "number": "5472974396484296",
    "cardHolderName": "MARIA SILVA",
    "securityCode": "860",
    "expirationDate": "09/27",
    "password": "1234",
    "isVirtual": false,
    "type": "credit"
  },
  {
    "title": "Cartão 2", 
    "number": "5472974396484296",
    "cardHolderName": "MARIA SILVA",
    "securityCode": "860",
    "expirationDate": "09/27",
    "password": "1234",
    "isVirtual": false,
    "type": "debit"
  }
]
```
  - **StatusCodes**:
    - 200: sucesso;
    - 401: token inválido;
    - 404: usuário não encontrado (verificação do token).

### Rota: GET ```/cards/:cardId```
  - **Função**: Busca um cartão específico pertencente ao usuário;
  - Rota autenticada com um header do tipo **"Authorization"** no formato **"Bearer token"**;
  - **Retorno:**
```json
{
  "title": "Cartão 1", 
  "number": "5472974396484296",
  "cardHolderName": "MARIA SILVA",
  "securityCode": "860",
  "expirationDate": "09/27",
  "password": "1234",
  "isVirtual": false,
  "type": "credit"
}
```
  - **StatusCodes**:
    - 200: sucesso;
    - 401: token inválido ou cartão não pertencente ao usuário;
    - 404: usuário não encontrado (verificação do token) ou cartão não encontrado.


### Rota: DELETE ```/cards/delete/:cardId```
  - **Função**: Deleta um cartão específico pertencente ao usuário;
  - Rota autenticada com um header do tipo **"Authorization"** no formato **"Bearer token"**;
  - **StatusCodes**:
    - 200: sucesso;
    - 401: token inválido ou cartão não pertencente ao usuário;
    - 404: usuário não encontrado (verificação do token) ou cartão não encontrado.

### Rota: POST ```/wifis/create```
  - **Função**: Cria novo wifi;
  - Rota autenticada com um header do tipo **"Authorization"** no formato **"Bearer token"**;
  - **Request:** body no formato:
```json
{
  "title": "Wifi 1", //string
  "networkName": "casa", //string
  "password": "12345678" //string
}
```
  - **StatusCodes**:
    - 201: sucesso na criação;
    - 401: token inválido;
    - 404: usuário não encontrado (verificação do token);
    - 409: titulo já existente;
    - 422: erro no formato do body.


### Rota: GET ```/wifis```
  - **Função**: Busca todos os wifis pertencentes ao usuário;
  - Rota autenticada com um header do tipo **"Authorization"** no formato **"Bearer token"**;
  - **Retorno:**
```json
[
  {
    "title": "Wifi 1",
    "networkName": "casa",
    "password": "12345678"
  },
  {
    "title": "Wifi 2",
    "networkName": "trabalho",
    "password": "12345678"
  }
]
```
  - **StatusCodes**:
    - 200: sucesso;
    - 401: token inválido;
    - 404: usuário não encontrado (verificação do token).

### Rota: GET ```/wifis/:wifiId```
  - **Função**: Busca um wifi específico pertencente ao usuário;
  - Rota autenticada com um header do tipo **"Authorization"** no formato **"Bearer token"**;
  - **Retorno:**
```json
{
  "title": "Wifi 1",
  "networkName": "casa",
  "password": "12345678"
}
```
  - **StatusCodes**:
    - 200: sucesso;
    - 401: token inválido ou wifi não pertencente ao usuário;
    - 404: usuário não encontrado (verificação do token) ou wifi não encontrado.


### Rota: DELETE ```/wifis/delete/:wifiId```
  - **Função**: Deleta um wifi específico pertencente ao usuário;
  - Rota autenticada com um header do tipo **"Authorization"** no formato **"Bearer token"**;
  - **StatusCodes**:
    - 200: sucesso;
    - 401: token inválido ou wifi não pertencente ao usuário;
    - 404: usuário não encontrado (verificação do token) ou wifi não encontrado.
    