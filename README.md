# DrivenPass

### Rota: POST ```/auth/sign-up```
  - **Função**: Registro de usuários
  - **Request:** body no formato:
```json
{
    "email": "teste@email.com", //string (email)
    "password": "1234567890" //string (min 10 dígitos)
}
```

### Rota: POST ```/auth/sign-in```
  - **Função**: Login de usuários
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

### Rota: POST ```/credentials/create```
  - **Função**: Criar nova credencial
  - Rota autenticada com um header do tipo **"Authorization"** (token)
  - **Request:** body no formato:
```json
{
    "title": "1 Credencial", //string
    "url": "https://www.facebook.com", //string (url)
    "username": "teste", //string
    "password": "123456" //string
}
```