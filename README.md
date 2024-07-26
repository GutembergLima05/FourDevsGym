# FourDevs GymManager

## 💻 Visão Geral
FourDevs GymManager é um sistema de gerenciamento de academias de bairro desenvolvido pela equipe da FourDevs. Nosso objetivo é fornecer uma solução integrada para administração de academias, incluindo controle financeiro dos planos, gerenciamento de treinos, processamento de pagamentos e muito mais. Além disso, oferecemos um aplicativo dedicado para os alunos, onde eles podem acessar seus treinos, fazer pagamentos dos planos e acompanhar seu progresso diretamente pelo celular.

Inicialmente, estamos desenvolvendo o FourDevs GymManager como um projeto de portfólio para demonstrar nossas habilidades e expertise. Em seguida, planejamos comercializar a solução para academias de bairro, oferecendo uma ferramenta poderosa e acessível para melhorar a gestão e a experiência dos alunos.

## 💡 Funcionalidades

### Painel Administrativo
- **Controle Financeiro**: Gerencie receitas e despesas de forma eficiente.
- **Gerenciamento de Treinos**: Crie e atribua planos de treino personalizados para os alunos.
- **Pagamentos**: Processe e acompanhe pagamentos de planos.

### Aplicativo para Alunos
- **Visualização de Treinos**: Acesse o treino recomendado pela academia a qualquer momento.
- **Pagamentos Online**: Realize pagamentos do plano de forma fácil e segura pelo app.
- **Visualização das Avaliações**: Acompanhe sua evolução tendo acesso às suas avaliações físicas realizadas na academia.
- **Avisos da Academia**:Fique por dentro de todas as atualizações e avisos importantes da academia.

## ⭐ Diferenciais Implementados
- **Dashboard Interativo**:Visualização do total de alunos, incluindo aqueles sem planos, para uma melhor tomada de decisão.
- **Responsividade**: Layout adaptado para todos os dispositivos, garantindo uma ótima experiência tanto no desktop quanto no mobile.

## 🚀 Tecnologias Utilizadas
Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **HTML5** e **CSS**: Tecnologias base para construção da interface do usuário.
- **NodeJs**: Ambiente de execução para construção do back-end.
- **JWT (JSON Web Token)**: Implementação de autenticação segura.
- **Git**: Controle de versão para gerenciar o código fonte.
- **Vercel**: Plataforma de hospedagem para aplicações Back-end.

## 🗂️ Estrutura do Projeto
<details>
<summary>🎨 Estrutura Front-End</summary>

<pre>
<code>
frontend/
├── pages/
│   └── (páginas do site seguindo essa estrutura)/
│       ├── js/
│       │   └── script.js
│       ├── style/
│       │   └── style.css
│       └── index.html
├── public/
│   ├── assets/
│   │   └── (imagens, fontes, e outros arquivos estáticos)
│   ├── headerMain/
│   │   └── (arquivos relacionados ao cabeçalho principal da aplicação)
│   ├── jsMain/
│   │   └── (scripts JavaScript principais)
│   └── styleMain/
│       └── (arquivos CSS principais)
├── src/
    ├── components/
    │   └── (componentes reutilizáveis e específicos da aplicação)
    └── connectionAPI/
        └── (módulos e funções para conexão com APIs)


</code>
</pre>

</details>



<details>
<summary>⚙️ Rotas API Backend</summary>
<br>

**ATENÇÃO! Os endpoints deverão seguir a estrutura descrita logo abaixo.**

<hr>

**IMPORTANTE: Para realizar o a chamada de qualquer uma das rotas é necessário realizar um login, seja como aluno ou administrador da academia. TODAS as rotas precisam de uma informação de TOKEN, que obtém-se através dos login's. A seguir você encontrará as rotas de login respectivamente;**

<hr>
<details>
  <summary>Login Administrador</summary>
    <hr>

**ATENÇÃO! Para realizar o login é necessário informar a key de acesso do sistema.**

| routes | description  
|----------------------|-----------------------------------------------------
| <kbd>POST /adm/login | realiza o login de administrador


<h3 id="post-login">REQUEST POST <kbd>/adm/login</kbd></h3>


```json
{
	"email": "recepcionista@gmail.com",
	"senha": "adm12345",
	"key": "3f7e9b8d4c1a2e5b7f6a8c3d9e1b7a2c"
}
```

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"usuario": {
			"id_adm": 2,
			"email": "recepcionista@gmail.com",
			"nome": "Jessica",
			"cargo": "recepcionista",
			"id_academia": 1,
			"data_criacao": "08/07/2024 00:00:00",
			"data_atualizacao": "08/07/2024 14:42:55",
			"nome_academia": "Soares FIT"
		},
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG0iOjIsImVtYWlsIjoicmVjZXBjaW9uaXN0YUBnbWFpbC5jb20iLCJub21lIjoiSmVzc2ljYSIsImNhcmdvIjoicmVjZXBjaW9uaXN0YSIsImlkX2FjYWRlbWlhIjoxLCJkYXRhX2NyaWFjYW8iOiIwOC8wNy8yMDI0IDAwOjAwOjAwIiwiZGF0YV9hdHVhbGl6YWNhbyI6IjA4LzA3LzIwMjQgMTQ6NDI6NTUiLCJub21lX2FjYWRlbWlhIjoiU29hcmVzIEZJVCIsImlhdCI6MTcyMTQ5Njg4NSwiZXhwIjoxNzIyMTAxNjg1fQ.F-aDl226btZuu7Zd5wF_RK-5riyQdntY1ug5E1tcVYk"
	},
	"success": true
}
```
</details>
<hr>

<details>
  <summary>Login Aluno</summary>
    <hr>

**ATENÇÃO! Para realizar o login é necessário informar a key de acesso do sistema.**

| routes | description  
|----------------------|-----------------------------------------------------
| <kbd>POST /student/login | realiza o login de alunos


<h3 id="post-login">REQUEST POST <kbd>/adm/login</kbd></h3>


```json
{
	"nascimento": "2024-07-19",
	"matricula": 13,
	"key": "3f7e9b8d4c1a2e5b7f6a8c3d9e1b7a2c"
}
```

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"usuario": {
			"id_aluno": 13,
			"nome": "Show",
			"email": "mario@gmail.com",
			"nascimento": "19/07/2024",
			"telefone": "454545",
			"endereco": "Tiúmaa",
			"historico": "sd",
			"data_inicio_plano": "17/07/2024",
			"plano_ativo": true,
			"id_academia": 1,
			"id_treino": 19,
			"id_plano": 6,
			"data_criacao": "15/07/2024 00:00:00",
			"data_atualizacao": "19/07/2024 14:12:38",
			"nome_academia": "Soares FIT"
		},
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hbHVubyI6MTMsIm5vbWUiOiJTaG93IiwiZW1haWwiOiJtYXJpb0BnbWFpbC5jb20iLCJuYXNjaW1lbnRvIjoiMTkvMDcvMjAyNCIsInRlbGVmb25lIjoiNDU0NTQ1IiwiZW5kZXJlY28iOiJUacO6bWFhIiwiaGlzdG9yaWNvIjoic2QiLCJkYXRhX2luaWNpb19wbGFubyI6IjE3LzA3LzIwMjQiLCJwbGFub19hdGl2byI6dHJ1ZSwiaWRfYWNhZGVtaWEiOjEsImlkX3RyZWlubyI6MTksImlkX3BsYW5vIjo2LCJkYXRhX2NyaWFjYW8iOiIxNS8wNy8yMDI0IDAwOjAwOjAwIiwiZGF0YV9hdHVhbGl6YWNhbyI6IjE5LzA3LzIwMjQgMTQ6MTI6MzgiLCJub21lX2FjYWRlbWlhIjoiU29hcmVzIEZJVCIsImlhdCI6MTcyMTY0ODczMywiZXhwIjoxNzIyMjUzNTMzfQ.YhGCMFSWF_TWgdgBf9jA_H-OInVOlDJlIV4N58Ma8tI"
	},
	"success": true
}
```
</details>
<hr>

<details>
  <summary>Endpoint Payment</summary>
  <hr>

| routes | description  
|----------------------|-----------------------------------------------------
| <kbd>POST /payment | realiza a criação para pagamento pix [post details](#post-tasks-user)
| <kbd>GET /payment/:id_pagamento | retorna as informações do pagamento [get details](#get-tasks-user)


<h3 id="post-login">REQUEST POST <kbd>/payment</kbd></h3>

```json
{
	"id_aluno": 10,
	"id_plano": 14
}
```

**RESPONSE: <kbd>201 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_pagamento": 83291775685,
		"copia_cola": "00020126580014br.gov.bcb.pix01360a683152-b9b8-400f-a281-63805b18a28152040000530398654040.015802BR5923WILKENIOPEREIRAGUITARRA6009Sao Paulo62240520mpqrinter832917756856304487E",
		"status": "pending"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST GET <kbd>/payment/:id_pagamento</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"message": "Pagamento aprovado",
		"status": "approved"
	},
	"success": true
}
```
</details>

<hr>
<details>
  <summary>Endpoint Dashboard</summary>
    <hr>

| routes | description  
|----------------------|-----------------------------------------------------
| <kbd>GET /dashboard | retorna as informações do dashboard [get details](#get-tasks-user)


<h3 id="post-login">REQUEST GET <kbd>/dashboard</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"total_alunos": "6",
		"alunos_sem_plano_ativo": "0",
		"aniversariantes": []
	},
	"success": true
}
```
</details>

<hr>
<details>
  <summary>Endpoint Administradores</summary>
       <hr>

| routes | description  
|----------------------|-----------------------------------------------------
| <kbd>POST /adm</kbd> | registrar um novo administrador [post details](#post-user)
| <kbd>GET /adm | retornar todos os administradores [get details](#get-tasks-user)
| <kbd>GET /adm/:id | retornar um administrador específico por id [get details](#get-tasks-user)
| <kbd>PUT /adm/:id</kbd> | atualizar um administrador por id [update details](#put-user)
| <kbd>DELETE /adm/:id</kbd> | deletar um administrador por id [delete details](#delete-user)



<h3 id="post-login">REQUEST POST <kbd>/adm</kbd></h3>


```json
{
	"email": "personal@gmail.com",
	"nome": "Gutemberg",
	"senha": "adm12345",
	"cargo":  "personal",
	"id_academia": 1
}
```

**RESPONSE: <kbd>201 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_adm": 3,
		"email": "personal@gmail.com",
		"nome": "Gutemberg",
		"cargo": "personal",
		"id_academia": 1,
		"data_criacao": "11/07/2024 00:00:00",
		"data_atualizacao": "11/07/2024 09:24:48"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST GET <kbd>/adm</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": [
		{
			"id_adm": 1,
			"email": "dono@gmail.com",
			"nome": "Wilkenio",
			"cargo": "dono",
			"id_academia": 1,
			"data_criacao": "21/06/2024 21:00:00",
			"data_atualizacao": "22/06/2024 05:56:38"
		},
		{
			"id_adm": 3,
			"email": "recepcionista@gmail.com",
			"nome": "Jessica",
			"cargo": "recepcionista",
			"id_academia": 1,
			"data_criacao": "22/06/2024 21:00:00",
			"data_atualizacao": "25/06/2024 18:21:57"
		},
		{
			"id_adm": 2,
			"email": "personal@gmail.com",
			"nome": "Gutemberg",
			"cargo": "personal",
			"id_academia": 1,
			"data_criacao": "21/06/2024 21:00:00",
			"data_atualizacao": "25/06/2024 18:22:25"
		},
		{
			"id_adm": 9,
			"email": "test@gmail.com",
			"nome": "Jessica",
			"cargo": "personal",
			"id_academia": 1,
			"data_criacao": "27/06/2024 21:00:00",
			"data_atualizacao": "28/06/2024 08:09:34"
		}
	],
	"success": true
}
```

<h3 id="post-login">REQUEST GET BY ID <kbd>/adm/:id</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_adm": 9,
		"email": "test@gmail.com",
		"nome": "Jessica",
		"cargo": "personal",
		"id_academia": 1,
		"data_criacao": "27/06/2024 21:00:00",
		"data_atualizacao": "28/06/2024 08:09:34"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST PUT <kbd>/adm/:id</kbd></h3>


```json
{
	"email": "recepcionista@gmail.com",
	"senha": "adm12345",
	"nome": "Jessica",
	"cargo":  "recepcionista",
	"id_academia": 1
}
```

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_adm": 3,
		"email": "recepcionista@gmail.com",
		"nome": "Jessica",
		"cargo": "recepcionista",
		"id_academia": 1,
		"data_criacao": "22/06/2024 21:00:00",
		"data_atualizacao": "28/06/2024 09:34:13"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST DELETE <kbd>/adm/:id</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_adm": 2,
		"email": "personal@gmail.com",
		"nome": "Gutemberg",
		"cargo": "personal",
		"id_academia": 1,
		"data_criacao": "22/06/2024 00:00:00",
		"data_atualizacao": "28/06/2024 11:57:16"
	},
	"success": true
}
```
</details>

<hr>
<details>
  <summary>Endpoint Alunos</summary>
      <hr>

| routes | description  
|----------------------|-----------------------------------------------------
| <kbd>POST /student</kbd> | registrar um novo aluno [post details](#post-user)
| <kbd>GET /student | retornar todos os alunos [get details](#get-tasks-user)
| <kbd>GET /student/:id | retornar um aluno específico por id [get details](#get-tasks-user)
| <kbd>PUT /student/:id</kbd> | atualizar um aluno por id [update details](#put-user)
| <kbd>DELETE /student/:id</kbd> | deletar um aluno por id [delete details](#delete-user)



<h3 id="post-login">REQUEST POST <kbd>/student</kbd></h3>


```json
{
	"nome": "finance",
	"email": "testfina22aa22nce@gmail.com",
	"nascimento": "2024-07-09",
	"telefone": "81995924486",
	"endereco": "Nova tiuma",
	"historico": "Vazio",
	"id_academia": 1,
	"id_treino": 19,
	"id_plano": 11
}
```

**RESPONSE: <kbd>201 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_aluno": 18,
		"nome": "finance",
		"email": "testfina22aa22nce@gmail.com",
		"nascimento": "09/07/2024 00:00:00",
		"telefone": "81995924486",
		"endereco": "Nova tiuma",
		"historico": "Vazio",
		"data_inicio_plano": "18/07/2024 00:00:00",
		"plano_ativo": true,
		"id_academia": 1,
		"id_treino": 19,
		"id_plano": 11,
		"data_criacao": "18/07/2024 00:00:00",
		"data_atualizacao": "18/07/2024 14:23:14"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST GET <kbd>/student</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": [
		{
			"id_aluno": 13,
			"nome": "Show",
			"email": "mario@gmail.com",
			"nascimento": "16/07/2024 00:00:00",
			"telefone": "454545",
			"endereco": "Tiúmaa",
			"historico": "sd",
			"data_inicio_plano": "17/07/2024 00:00:00",
			"plano_ativo": true,
			"id_academia": 1,
			"id_treino": 19,
			"id_plano": 6,
			"data_criacao": "15/07/2024 00:00:00",
			"data_atualizacao": "17/07/2024 12:07:31"
		},
		{
			"id_aluno": 14,
			"nome": "Teste de plano 2",
			"email": "test1e1@gmail.com",
			"nascimento": "18/07/2024 00:00:00",
			"telefone": "81995924486",
			"endereco": "Nova tiuma",
			"historico": "Vazio",
			"data_inicio_plano": "18/07/2024 00:00:00",
			"plano_ativo": true,
			"id_academia": 1,
			"id_treino": 19,
			"id_plano": 6,
			"data_criacao": "17/07/2024 00:00:00",
			"data_atualizacao": "18/07/2024 12:45:32"
		},
		{
			"id_aluno": 15,
			"nome": "finance",
			"email": "testfinance@gmail.com",
			"nascimento": "09/07/2024 00:00:00",
			"telefone": "81995924486",
			"endereco": "Nova tiuma",
			"historico": "Vazio",
			"data_inicio_plano": "18/07/2024 00:00:00",
			"plano_ativo": true,
			"id_academia": 1,
			"id_treino": 19,
			"id_plano": 11,
			"data_criacao": "18/07/2024 00:00:00",
			"data_atualizacao": "18/07/2024 14:20:16"
		},
		{
			"id_aluno": 16,
			"nome": "finance",
			"email": "testfina22nce@gmail.com",
			"nascimento": "09/07/2024 00:00:00",
			"telefone": "81995924486",
			"endereco": "Nova tiuma",
			"historico": "Vazio",
			"data_inicio_plano": "18/07/2024 00:00:00",
			"plano_ativo": true,
			"id_academia": 1,
			"id_treino": 19,
			"id_plano": 11,
			"data_criacao": "18/07/2024 00:00:00",
			"data_atualizacao": "18/07/2024 14:21:31"
		},
		{
			"id_aluno": 17,
			"nome": "finance",
			"email": "testfina2222nce@gmail.com",
			"nascimento": "09/07/2024 00:00:00",
			"telefone": "81995924486",
			"endereco": "Nova tiuma",
			"historico": "Vazio",
			"data_inicio_plano": "18/07/2024 00:00:00",
			"plano_ativo": true,
			"id_academia": 1,
			"id_treino": 19,
			"id_plano": 11,
			"data_criacao": "18/07/2024 00:00:00",
			"data_atualizacao": "18/07/2024 14:22:18"
		},
		{
			"id_aluno": 18,
			"nome": "finance",
			"email": "testfina22aa22nce@gmail.com",
			"nascimento": "09/07/2024 00:00:00",
			"telefone": "81995924486",
			"endereco": "Nova tiuma",
			"historico": "Vazio",
			"data_inicio_plano": "18/07/2024 00:00:00",
			"plano_ativo": true,
			"id_academia": 1,
			"id_treino": 19,
			"id_plano": 11,
			"data_criacao": "18/07/2024 00:00:00",
			"data_atualizacao": "18/07/2024 14:23:14"
		},
		{
			"id_aluno": 6,
			"nome": "Victor",
			"email": "test1ge1d@gmail.com",
			"nascimento": "17/07/2024 00:00:00",
			"telefone": "81995924486",
			"endereco": "Nova tiuma",
			"historico": "Vazio",
			"data_inicio_plano": "17/07/2024 00:00:00",
			"plano_ativo": true,
			"id_academia": 1,
			"id_treino": 19,
			"id_plano": 6,
			"data_criacao": "15/07/2024 00:00:00",
			"data_atualizacao": "17/07/2024 13:05:38"
		},
		{
			"id_aluno": 7,
			"nome": "Gutemberg",
			"email": "teste@gmail.com",
			"nascimento": "01/06/2005 00:00:00",
			"telefone": "81995924486",
			"endereco": "Nova tiuma",
			"historico": "Vazio",
			"data_inicio_plano": "15/07/2024 00:00:00",
			"plano_ativo": true,
			"id_academia": 1,
			"id_treino": 18,
			"id_plano": 6,
			"data_criacao": "15/07/2024 00:00:00",
			"data_atualizacao": "16/07/2024 14:07:02"
		},
		{
			"id_aluno": 10,
			"nome": "Wilkenio",
			"email": "sssss@gmail.com",
			"nascimento": "30/07/2024 00:00:00",
			"telefone": "8197105220",
			"endereco": "Melhor cidade",
			"historico": "sdsds",
			"data_inicio_plano": "15/07/2024 00:00:00",
			"plano_ativo": true,
			"id_academia": 1,
			"id_treino": 19,
			"id_plano": 11,
			"data_criacao": "15/07/2024 00:00:00",
			"data_atualizacao": "18/07/2024 12:36:19"
		}
	],
	"success": true
}
```

<h3 id="post-login">REQUEST GET BY ID <kbd>/student/:id</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_aluno": 2,
		"nome": "Wilkenio",
		"email": "wilkenio123@gmail.com",
		"nascimento": "01/06/2005 00:00:00",
		"telefone": "81995924486",
		"endereco": "Paudalho",
		"historico": "Vazio",
		"id_academia": 1,
		"id_treino": 18,
		"id_plano": 14,
		"data_criacao": "03/07/2024 00:00:00",
		"data_atualizacao": "03/07/2024 20:00:33",
		"data_inicio_plano": "03/07/2024 00:00:00",
		"plano_ativo": false
	},
	"success": true
}
```

<h3 id="post-login">REQUEST PUT <kbd>/student/:id</kbd></h3>


```json
{
	"nome": "teste",
	"email": "test2e@gmail.com",
	"nascimento": "2005-06-01",
	"telefone": "81995924486",
	"endereco": "Nova tiuma",
	"historico": "Vazio",
	"id_academia": 1,
	"id_treino": 18,
	"id_plano": 6
}
```

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_aluno": 18,
		"nome": "teste",
		"email": "test2e@gmail.com",
		"nascimento": "01/06/2005 00:00:00",
		"telefone": "81995924486",
		"endereco": "Nova tiuma",
		"historico": "Vazio",
		"data_inicio_plano": "18/07/2024 00:00:00",
		"plano_ativo": true,
		"id_academia": 1,
		"id_treino": 18,
		"id_plano": 6,
		"data_criacao": "18/07/2024 00:00:00",
		"data_atualizacao": "18/07/2024 14:24:38"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST DELETE <kbd>/student/:id</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_aluno": 18,
		"nome": "teste",
		"email": "test2e@gmail.com",
		"nascimento": "01/06/2005 00:00:00",
		"telefone": "81995924486",
		"endereco": "Nova tiuma",
		"historico": "Vazio",
		"data_inicio_plano": "18/07/2024 00:00:00",
		"plano_ativo": true,
		"id_academia": 1,
		"id_treino": 18,
		"id_plano": 6,
		"data_criacao": "18/07/2024 00:00:00",
		"data_atualizacao": "18/07/2024 14:24:38"
	},
	"success": true
}
```
</details>

<hr>
<details>
  <summary>Endpoint Planos</summary>
<hr>

| routes | description  
|----------------------|-----------------------------------------------------
| <kbd>POST /plan</kbd> | registrar um novo plano [post details](#post-user)
| <kbd>GET /plan | retornar todos os planos [get details](#get-tasks-user)
| <kbd>GET /plan/:id | retornar um plano específico por id [get details](#get-tasks-user)
| <kbd>PUT /plan/:id</kbd> | atualizar um plano por id [update details](#put-user)
| <kbd>DELETE /plan/:id</kbd> | deletar um plano por id [delete details](#delete-user)



<h3 id="post-login">REQUEST POST <kbd>/plan</kbd></h3>


```json
  {
	"tipo": "teste",
	"valor": 69.90,
	"dias_validade": 1,
	"id_academia": 1
  }
```

**RESPONSE: <kbd>201 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_plano": 3,
		"tipo": "teste",
		"valor": 69.9,
		"id_academia": 1,
		"dias_validade": 1,
		"data_criacao": "08/07/2024 21:00:00",
		"data_atualizacao": "09/07/2024 16:15:38"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST GET <kbd>/plan</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": [
		{
			"id_plano": 6,
			"tipo": "Plano Mensal",
			"valor": 70,
			"id_academia": 1,
			"dias_validade": 30,
			"data_criacao": "11/07/2024 00:00:00",
			"data_atualizacao": "13/07/2024 18:49:58",
			"quantidade_alunos": "4"
		},
		{
			"id_plano": 11,
			"tipo": "trimestral 2",
			"valor": 70,
			"id_academia": 1,
			"dias_validade": 90,
			"data_criacao": "13/07/2024 00:00:00",
			"data_atualizacao": "13/07/2024 20:19:03",
			"quantidade_alunos": "1"
		}
	],
	"success": true
}
```

<h3 id="post-login">REQUEST GET BY ID <kbd>/plan/:id</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_plano": 11,
		"tipo": "trimestral 2",
		"valor": 70,
		"id_academia": 1,
		"dias_validade": 90,
		"data_criacao": "13/07/2024 00:00:00",
		"data_atualizacao": "19/07/2024 13:31:36"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST PUT <kbd>/plan/:id</kbd></h3>


```json
  {
	"tipo": "trimestral",
	"valor": 189.90,
	"id_academia": 1,
	"dias_validade": 90
 }
```

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_plano": 11,
		"tipo": "trimestral",
		"valor": 189.9,
		"id_academia": 1,
		"dias_validade": 90,
		"data_criacao": "13/07/2024 00:00:00",
		"data_atualizacao": "20/07/2024 14:08:10"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST DELETE <kbd>/plan/:id</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_plano": 11,
		"tipo": "trimestral",
		"valor": 189.9,
		"id_academia": 1,
		"dias_validade": 90,
		"data_criacao": "13/07/2024 00:00:00",
		"data_atualizacao": "20/07/2024 14:08:10"
	},
	"success": true
}
```

</details>

<hr>
<details>
  <summary>Endpoint Avisos</summary>
    <hr>

| routes | description  
|----------------------|-----------------------------------------------------
| <kbd>POST /notice</kbd> | registrar um novo aviso [post details](#post-user)
| <kbd>GET /notice | retornar todos os avisos [get details](#get-tasks-user)
| <kbd>GET /notice/:id | retornar um aviso específico por id [get details](#get-tasks-user)
| <kbd>PUT /notice/:id</kbd> | atualizar um aviso por id [update details](#put-user)
| <kbd>DELETE /notice/:id</kbd> | deletar um aviso por id [delete details](#delete-user)



<h3 id="post-login">REQUEST POST <kbd>/notice</kbd></h3>


```json
{
	"titulo": "Carnaval 8",
	"descricao": "Funcionamento das 9:00 as 11:30",
	"data_expiracao": "2024-06-22T12:03:30",
	"id_academia": 1
}
```

**RESPONSE: <kbd>201 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_aviso": 60,
		"titulo": "Carnaval 8",
		"descricao": "Funcionamento das 9:00 as 11:30",
		"id_academia": 1,
		"data_criacao": "23/06/2024 00:00:00",
		"data_atualizacao": "23/06/2024 10:11:53",
		"data_expiracao": "22/06/2024 12:03:30"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST GET <kbd>/notice</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": [
		{
			"id_aviso": 7,
			"titulo": "Promoção no plano Trimestral !",
			"descricao": "Testd",
			"id_academia": 1,
			"gif_url": null,
			"data_criacao": "14/07/2024 00:00:00",
			"data_atualizacao": "20/07/2024 13:24:34",
			"data_expiracao": "14/07/2024 21:01:22"
		},
		{
			"id_aviso": 6,
			"titulo": "Carnaval na Soares FIT",
			"descricao": "Acompanhe conosco a semana de carnaval com eventos especiais",
			"id_academia": 1,
			"gif_url": null,
			"data_criacao": "13/07/2024 00:00:00",
			"data_atualizacao": "20/07/2024 13:26:19",
			"data_expiracao": "16/07/2024 18:46:35"
		},
		{
			"id_aviso": 10,
			"titulo": "Teste de exclusão",
			"descricao": "será que vai sumir ?",
			"id_academia": 1,
			"gif_url": null,
			"data_criacao": "20/07/2024 00:00:00",
			"data_atualizacao": "20/07/2024 13:29:24",
			"data_expiracao": "21/07/2024 13:23:45"
		}
	],
	"success": true
}
```

<h3 id="post-login">REQUEST GET BY ID <kbd>/notice/:id</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_aviso": 7,
		"titulo": "Promoção no plano Trimestral !",
		"descricao": "Testd",
		"id_academia": 1,
		"gif_url": null,
		"data_criacao": "14/07/2024 00:00:00",
		"data_atualizacao": "20/07/2024 13:24:34",
		"data_expiracao": "14/07/2024 21:01:22"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST PUT <kbd>/notice/:id</kbd></h3>


```json
{
	"titulo": "Carnaval São joão",
	"descricao": "Funcionamento das 9:00 as 11:30",
	"data_expiracao": "2024-06-22T12:03:30",
	"id_academia": 1
}
```

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_aviso": 58,
		"titulo": "Carnaval São joão",
		"descricao": "Funcionamento das 9:00 as 11:30",
		"id_academia": 1,
		"data_criacao": "22/06/2024 00:00:00",
		"data_atualizacao": "22/06/2024 12:18:15",
		"data_expiracao": "22/06/2024 12:03:30"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST DELETE <kbd>/notice/:id</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_aviso": 57,
		"titulo": "Carnaval 8",
		"descricao": "Funcionamento das 9:00 as 11:30",
		"id_academia": 1,
		"data_criacao": "22/06/2024 00:00:00",
		"data_atualizacao": "22/06/2024 12:16:30",
		"data_expiracao": "22/06/2024 12:03:30"
	},
	"success": true
}
```
</details>

<hr>
<details>
  <summary>Endpoint Exercícios</summary>
  <hr>

| routes | description  
|----------------------|-----------------------------------------------------
| <kbd>POST /exercise</kbd> | registrar um novo exercício [post details](#post-user)
| <kbd>GET /exercise | retornar todos os exercícios [get details](#get-tasks-user)
| <kbd>GET /exercise/:id | retornar um exercício específico por id [get details](#get-tasks-user)
| <kbd>PUT /exercise/:id</kbd> | atualizar um exercício por id [update details](#put-user)
| <kbd>DELETE /exercise/:id</kbd> | deletar um exercício por id [delete details](#delete-user)



<h3 id="post-login">REQUEST POST <kbd>/exercise</kbd></h3>


```json
  {
	"nome": "dd22ddd",
	"descricao": "dd 222ombro",
	"id_administrador": "2",
	"gif_url": "/imagens/ombro.jpg"
 }
```

**RESPONSE: <kbd>201 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_exercicio": 13,
		"nome": "dd22ddd",
		"descricao": "dd 222ombro",
		"id_administrador": 2,
		"gif_url": "/imagens/ombro.jpg",
		"data_criacao": "10/07/2024 00:00:00",
		"data_atualizacao": "10/07/2024 17:24:10"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST GET <kbd>/exercise</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": [
		{
			"id_exercicio": 9,
			"nome": "Extensora",
			"descricao": "Treino de perna",
			"id_administrador": 2,
			"gif_url": "/imagens/extensora.jpg",
			"data_criacao": "10/07/2024 00:00:00",
			"data_atualizacao": "10/07/2024 17:19:12"
		},
		{
			"id_exercicio": 10,
			"nome": "Ombro",
			"descricao": "Treino de ombro",
			"id_administrador": 2,
			"gif_url": "/imagens/ombro.jpg",
			"data_criacao": "10/07/2024 00:00:00",
			"data_atualizacao": "10/07/2024 17:20:11"
		},
		{
			"id_exercicio": 12,
			"nome": "ddd",
			"descricao": "dd ombro",
			"id_administrador": 2,
			"gif_url": "/imagens/ombro.jpg",
			"data_criacao": "10/07/2024 00:00:00",
			"data_atualizacao": "10/07/2024 17:23:01"
		}
	],
	"success": true
}
```

<h3 id="post-login">REQUEST GET BY ID <kbd>/exercise/:id</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_exercicio": 3,
		"nome": "Extensora",
		"descricao": "Treino de Perna",
		"id_administrador": 1,
		"gif_url": "https://media.tenor.com/bqKtsSuqilQAAAAM/gym.gif",
		"data_criacao": "08/07/2024 00:00:00",
		"data_atualizacao": "18/07/2024 21:39:52"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST PUT <kbd>/exercise/:id</kbd></h3>


```json
{
	"nome": "Extensora",
	"descricao": "Treino de Perna",
	"id_administrador": 1,
	"gif_url": "https://media.tenor.com/bqKtsSuqilQAAAAM/gym.gif"
}
```

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_exercicio": 3,
		"nome": "Extensora",
		"descricao": "Treino de Perna",
		"id_administrador": 1,
		"gif_url": "https://media.tenor.com/bqKtsSuqilQAAAAM/gym.gif",
		"data_criacao": "08/07/2024 00:00:00",
		"data_atualizacao": "20/07/2024 14:19:42"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST DELETE <kbd>/exercise/:id</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_exercicio": 12,
		"nome": "ddd",
		"descricao": "dd ombro",
		"id_administrador": 2,
		"gif_url": "/imagens/ombro.jpg",
		"data_criacao": "10/07/2024 00:00:00",
		"data_atualizacao": "10/07/2024 17:23:01"
	},
	"success": true
}
```

</details>

<hr>
<details>
  <summary>Endpoint Treinos</summary>
         <hr>

| routes | description  
|----------------------|-----------------------------------------------------
| <kbd>POST /training</kbd> | registrar um novo treino [post details](#post-user)
| <kbd>GET /training | retornar todos os treinos [get details](#get-tasks-user)
| <kbd>GET /training/:id | retornar um treino específico por id [get details](#get-tasks-user)
| <kbd>PUT /training/:id</kbd> | atualizar um treino por id [update details](#put-user)
| <kbd>DELETE /training/:id</kbd> | deletar um treino por id [delete details](#delete-user)



<h3 id="post-login">REQUEST POST <kbd>/training</kbd></h3>


```json
{
  "nome": "Treino 8",
  "descricao": "Treino de braço",
  "id_administrador": 1,
  "dias": [
    {
      "id_dia": 1,
      "exercicios": [
        { "id_exercicio": 1, "repeticoes": 10, "series": 3 },
        { "id_exercicio": 2, "repeticoes": 12, "series": 4 },
        { "id_exercicio": 3, "repeticoes": 8, "series": 3 }
      ]
    },
    {
      "id_dia": 2,
      "exercicios": [
        { "id_exercicio": 9, "repeticoes": 15, "series": 3 },
        { "id_exercicio": 2, "repeticoes": 12, "series": 4 },
        { "id_exercicio": 3, "repeticoes": 10, "series": 3 }
      ]
    }
  ]
}

```

**RESPONSE: <kbd>201 Ok</kbd>**

```json
{
	"conteudoJson": {
		"treino": {
			"id_treino": 13,
			"nome": "Treino 8",
			"descricao": "Treino de braço",
			"id_administrador": 1,
			"data_criacao": "29/06/2024 21:00:00",
			"data_atualizacao": "30/06/2024 04:20:15"
		},
		"dias": [
			{
				"id_dia": 1,
				"exercicios": [
					{
						"id_exercicio": 1,
						"repeticoes": 10,
						"series": 3
					},
					{
						"id_exercicio": 2,
						"repeticoes": 12,
						"series": 4
					},
					{
						"id_exercicio": 3,
						"repeticoes": 8,
						"series": 3
					}
				]
			},
			{
				"id_dia": 2,
				"exercicios": [
					{
						"id_exercicio": 9,
						"repeticoes": 15,
						"series": 3
					},
					{
						"id_exercicio": 2,
						"repeticoes": 12,
						"series": 4
					},
					{
						"id_exercicio": 3,
						"repeticoes": 10,
						"series": 3
					}
				]
			}
		]
	},
	"success": true
}
```

<h3 id="post-login">REQUEST GET <kbd>/training</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": [
		{
			"id_treino": 19,
			"nome": "Treino guto",
			"descricao": "Treino de braço",
			"id_administrador": 1,
			"data_criacao": "11/07/2024 00:00:00",
			"data_atualizacao": "12/07/2024 08:12:06"
		},
		{
			"id_treino": 20,
			"nome": "Treino teste 2",
			"descricao": "df",
			"id_administrador": 1,
			"data_criacao": "12/07/2024 00:00:00",
			"data_atualizacao": "12/07/2024 08:15:30"
		},
		{
			"id_treino": 18,
			"nome": "Treino teste",
			"descricao": "df",
			"id_administrador": 1,
			"data_criacao": "11/07/2024 00:00:00",
			"data_atualizacao": "12/07/2024 20:22:14"
		}
	],
	"success": true
}
```

<h3 id="post-login">REQUEST GET BY ID <kbd>/training/:id</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"treino": {
			"id_treino": 19,
			"nome": "Treino guto",
			"descricao": "Treino de braço",
			"id_administrador": 1,
			"data_criacao": "2024-07-11T00:00:00.000Z",
			"data_atualizacao": "2024-07-12T11:12:06.226Z"
		},
		"dias": [
			{
				"id_dia": 1,
				"dia_nome": "Dia 1",
				"exercicios": [
					{
						"id_exercicio": 1,
						"exercicio_nome": "Barra Fixa",
						"gif_url": "https://www.hipertrofia.org/blog/wp-content/uploads/2023/08/barra-fixa-negativa.gif",
						"repeticoes": 10,
						"series": 3
					},
					{
						"id_exercicio": 3,
						"exercicio_nome": "Extensora",
						"gif_url": "https://media.tenor.com/bqKtsSuqilQAAAAM/gym.gif",
						"repeticoes": 50,
						"series": 3
					},
					{
						"id_exercicio": 2,
						"exercicio_nome": "Abdominal Supra",
						"gif_url": "https://www.mundoboaforma.com.br/wp-content/uploads/2023/02/47271301-abdominal-supra.gif",
						"repeticoes": 12,
						"series": 4
					}
				]
			},
			{
				"id_dia": 2,
				"dia_nome": "Dia 2",
				"exercicios": [
					{
						"id_exercicio": 1,
						"exercicio_nome": "Barra Fixa",
						"gif_url": "https://www.hipertrofia.org/blog/wp-content/uploads/2023/08/barra-fixa-negativa.gif",
						"repeticoes": 15,
						"series": 3
					},
					{
						"id_exercicio": 3,
						"exercicio_nome": "Extensora",
						"gif_url": "https://media.tenor.com/bqKtsSuqilQAAAAM/gym.gif",
						"repeticoes": 12,
						"series": 3
					},
					{
						"id_exercicio": 2,
						"exercicio_nome": "Abdominal Supra",
						"gif_url": "https://www.mundoboaforma.com.br/wp-content/uploads/2023/02/47271301-abdominal-supra.gif",
						"repeticoes": 12,
						"series": 4
					},
					{
						"id_exercicio": 4,
						"exercicio_nome": "Supino Reto",
						"gif_url": "https://www.hipertrofia.org/blog/wp-content/uploads/2023/09/smith-bench-press.gif",
						"repeticoes": 105,
						"series": 3
					}
				]
			},
			{
				"id_dia": 3,
				"dia_nome": "Dia 3",
				"exercicios": [
					{
						"id_exercicio": 3,
						"exercicio_nome": "Extensora",
						"gif_url": "https://media.tenor.com/bqKtsSuqilQAAAAM/gym.gif",
						"repeticoes": 12,
						"series": 3
					},
					{
						"id_exercicio": 2,
						"exercicio_nome": "Abdominal Supra",
						"gif_url": "https://www.mundoboaforma.com.br/wp-content/uploads/2023/02/47271301-abdominal-supra.gif",
						"repeticoes": 12,
						"series": 3
					}
				]
			}
		]
	},
	"success": true
}
```

<h3 id="post-login">REQUEST PUT <kbd>/training/:id</kbd></h3>


```json
{
  "nome": "Treino 4",
  "descricao": "Treino de braço",
  "id_administrador": 1,
  "dias": [
    {
      "id_dia": 1,
      "exercicios": [
        { "id_exercicio": 1, "repeticoes": 10, "series": 3 },
        { "id_exercicio": 2, "repeticoes": 12, "series": 4 },
        { "id_exercicio": 3, "repeticoes": 50, "series": 3 }
      ]
    },
    {
      "id_dia": 2,
      "exercicios": [
        { "id_exercicio": 1, "repeticoes": 15, "series": 3 },
        { "id_exercicio": 2, "repeticoes": 12, "series": 4 },
        { "id_exercicio": 3, "repeticoes": 100, "series": 3 }
      ]
    }
  ]
}

```

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"treino": {
			"id_treino": 8,
			"nome": "Treino 4",
			"descricao": "Treino de braço",
			"id_administrador": 1,
			"data_criacao": "23/06/2024 00:00:00",
			"data_atualizacao": "23/06/2024 14:37:55"
		},
		"dias": [
			{
				"id_dia": 1,
				"dia_nome": "Dia 1",
				"exercicios": [
					{
						"id_exercicio": 2,
						"exercicio_nome": "Legpress",
						"repeticoes": 12,
						"series": 4
					},
					{
						"id_exercicio": 1,
						"exercicio_nome": "Remador",
						"repeticoes": 10,
						"series": 3
					},
					{
						"id_exercicio": 3,
						"exercicio_nome": "Abdominal",
						"repeticoes": 50,
						"series": 3
					}
				]
			},
			{
				"id_dia": 2,
				"dia_nome": "Dia 2",
				"exercicios": [
					{
						"id_exercicio": 2,
						"exercicio_nome": "Legpress",
						"repeticoes": 12,
						"series": 4
					},
					{
						"id_exercicio": 1,
						"exercicio_nome": "Remador",
						"repeticoes": 15,
						"series": 3
					},
					{
						"id_exercicio": 3,
						"exercicio_nome": "Abdominal",
						"repeticoes": 100,
						"series": 3
					}
				]
			}
		]
	},
	"success": true
}
```

<h3 id="post-login">REQUEST DELETE <kbd>/training/:id</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_treino": 21,
		"nome": "Treino 8tsdsds",
		"descricao": "Treino de braço",
		"id_administrador": 1,
		"data_criacao": "20/07/2024 00:00:00",
		"data_atualizacao": "20/07/2024 14:58:37"
	},
	"success": true
}
```
</details>

<hr>
<details>
  <summary>Endpoint Academias</summary>
    <hr>

| routes | description  
|----------------------|-----------------------------------------------------
| <kbd>POST /gym</kbd> | registrar uma nova academia [post details](#post-user)
| <kbd>GET /gym | retornar todas as academias [get details](#get-tasks-user)
| <kbd>GET /gym/:id | retornar uma academia específico por id [get details](#get-tasks-user)
| <kbd>PUT /gym/:id</kbd> | atualizar uma academia por id [update details](#put-user)
| <kbd>DELETE /gym/:id</kbd> | deletar uma academia por id [delete details](#delete-user)



<h3 id="post-login">REQUEST POST <kbd>/gym</kbd></h3>


```json
{
	"nome": "Soares FIT",
	"endereco": "Paudalho"
}
```

**RESPONSE: <kbd>201 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_academia": 2,
		"nome": "Academia X",
		"endereco": "Paudalho",
		"data_criacao": "2024-07-20T00:00:00.000Z",
		"data_atualizacao": "2024-07-20T17:33:25.606Z"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST GET <kbd>/gym</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": [
		{
			"id_academia": 1,
			"nome": "Soares FIT",
			"endereco": "Paudalho",
			"data_criacao": "2024-07-08T00:00:00.000Z",
			"data_atualizacao": "2024-07-08T17:44:38.795Z"
		},
		{
			"id_academia": 2,
			"nome": "Academia X",
			"endereco": "Paudalho",
			"data_criacao": "2024-07-20T00:00:00.000Z",
			"data_atualizacao": "2024-07-20T17:33:25.606Z"
		}
	],
	"success": true
}
```

<h3 id="post-login">REQUEST GET BY ID <kbd>/gym/:id</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": [
		{
			"id_academia": 2,
			"nome": "Academia X",
			"endereco": "Paudalho",
			"data_criacao": "2024-07-20T00:00:00.000Z",
			"data_atualizacao": "2024-07-20T17:33:25.606Z"
		}
	],
	"success": true
}
```

<h3 id="post-login">REQUEST PUT <kbd>/gym/:id</kbd></h3>


```json
{
	"nome": "Soares Fit",
	"endereco": "Paudalho"
}
```

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_academia": 1,
		"nome": "Soares Fit",
		"endereco": "Paudalho"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST DELETE <kbd>/gym/:id</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": [
		{
			"id_academia": 3,
			"nome": "olaa",
			"endereco": "ola"
		}
	],
	"success": true
}
```
</details>

<hr>
<details>
  <summary>Endpoint Avaliações</summary>
     <hr>

| routes | description  
|----------------------|-----------------------------------------------------
| <kbd>POST /evaluation</kbd> | registrar uma nova avaliação [post details](#post-user)
| <kbd>GET /evaluation | retornar todas as avaliações [get details](#get-tasks-user)
| <kbd>GET /evaluation/:id | retornar uma avaliação específica por id [get details](#get-tasks-user)
| <kbd>PUT /evaluation/:id</kbd> | atualizar uma avaliação por id [update details](#put-user)
| <kbd>DELETE /evaluation/:id</kbd> | deletar uma avaliação por id [delete details](#delete-user)



<h3 id="post-login">REQUEST POST <kbd>/evaluation</kbd></h3>


```json
{
  "braco_direito_contraido": 35.5,
  "braco_direito_relaxado": 32.0,
  "braco_esquerdo_contraido": 34.8,
  "braco_esquerdo_relaxado": 31.5,
  "agua_corporal": 60.2,
  "torax": 100.5,
  "altura": 175,
  "peso": 70.5,
  "gordura_visceral": 10,
  "massa_ossea": 3.5,
  "cintura": 80,
  "abdomen": 85,
  "quadril": 95,
  "coxa_direita": 60,
  "coxa_esquerda": 59.5,
  "antebraco_direito": 28,
  "panturrilha_direita": 40,
  "panturrilha_esquerda": 39.5,
  "antebraco_esquerdo": 27.5,
	"obj": "Emagrecer",
	"idadeMeta": 189.0,
	"rcq": 57.0,
	"tmb": 17,
  "id_administrador": 1,
  "id_aluno": 7
}
```

**RESPONSE: <kbd>201 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_avaliacao": 3,
		"braco_direito_contraido": 35.5,
		"braco_direito_relaxado": 32,
		"braco_esquerdo_contraido": 34.8,
		"braco_esquerdo_relaxado": 31.5,
		"agua_corporal": 60.2,
		"torax": 100.5,
		"altura": 175,
		"peso": 70.5,
		"gordura_visceral": 10,
		"massa_ossea": 3.5,
		"cintura": 80,
		"abdomen": 85,
		"quadril": 95,
		"coxa_esquerda": 59.5,
		"coxa_direita": 60,
		"antebraco_direito": 28,
		"panturrilha_esquerda": 39.5,
		"panturrilha_direita": 40,
		"antebraco_esquerdo": 27.5,
		"id_administrador": 1,
		"id_aluno": 7,
		"data_criacao": "24/06/2024 00:00:00",
		"data_atualizacao": "24/06/2024 13:16:34"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST GET <kbd>/evaluation</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": [
		{
			"id_avaliacao": 2,
			"braco_direito_contraido": 35.5,
			"braco_direito_relaxado": 32,
			"braco_esquerdo_contraido": 34.8,
			"braco_esquerdo_relaxado": 31.5,
			"agua_corporal": 60.2,
			"torax": 100.5,
			"altura": 175,
			"peso": 70.5,
			"gordura_visceral": 10,
			"massa_ossea": 3.5,
			"cintura": 80,
			"abdomen": 85,
			"quadril": 95,
			"coxa_esquerda": 59.5,
			"coxa_direita": 60,
			"antebraco_direito": 28,
			"panturrilha_esquerda": 39.5,
			"panturrilha_direita": 40,
			"antebraco_esquerdo": 27.5,
			"id_administrador": 1,
			"id_aluno": 7,
			"data_criacao": "16/07/2024 00:00:00",
			"data_atualizacao": "16/07/2024 20:06:36",
			"obj": "Emagrecer",
			"idademeta": 189,
			"rcq": 57,
			"tmb": 17
		}
	],
	"success": true
}
```

<h3 id="post-login">REQUEST GET BY ID <kbd>/evaluation/:id</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_avaliacao": 2,
		"braco_direito_contraido": 35.5,
		"braco_direito_relaxado": 32,
		"braco_esquerdo_contraido": 34.8,
		"braco_esquerdo_relaxado": 31.5,
		"agua_corporal": 60.2,
		"torax": 100.5,
		"altura": 175,
		"peso": 70.5,
		"gordura_visceral": 10,
		"massa_ossea": 3.5,
		"cintura": 80,
		"abdomen": 85,
		"quadril": 95,
		"coxa_esquerda": 59.5,
		"coxa_direita": 60,
		"antebraco_direito": 28,
		"panturrilha_esquerda": 39.5,
		"panturrilha_direita": 40,
		"antebraco_esquerdo": 27.5,
		"id_administrador": 1,
		"id_aluno": 7,
		"data_criacao": "24/06/2024 00:00:00",
		"data_atualizacao": "24/06/2024 13:10:51"
	},
	"success": true
}
```

<h3 id="post-login">REQUEST PUT <kbd>/evaluation/:id</kbd></h3>


```json
{
  "braco_direito_contraido": 35.5,
  "braco_direito_relaxado": 32.0,
  "braco_esquerdo_contraido": 34.8,
  "braco_esquerdo_relaxado": 31.5,
  "agua_corporal": 60.2,
  "torax": 100.5,
  "altura": 175,
  "peso": 70.5,
  "gordura_visceral": 10,
  "massa_ossea": 3.5,
  "cintura": 80,
  "abdomen": 85,
  "quadril": 95,
  "coxa_direita": 60,
  "coxa_esquerda": 59.5,
  "antebraco_direito": 28,
  "panturrilha_direita": 40,
  "panturrilha_esquerda": 39.5,
  "antebraco_esquerdo": 27.5,
	"obj": "Emagrecer",
	"idademeta": 189.0,
	"rcq": 57.0,
	"tmb": 17,
  "id_administrador": 1,
  "id_aluno": 7
}
```

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_avaliacao": 2,
		"braco_direito_contraido": 35.5,
		"braco_direito_relaxado": 32,
		"braco_esquerdo_contraido": 34.8,
		"braco_esquerdo_relaxado": 31.5,
		"agua_corporal": 60.2,
		"torax": 100.5,
		"altura": 175,
		"peso": 70.5,
		"gordura_visceral": 10,
		"massa_ossea": 3.5,
		"cintura": 80,
		"abdomen": 85,
		"quadril": 95,
		"coxa_esquerda": 59.5,
		"coxa_direita": 60,
		"antebraco_direito": 28,
		"panturrilha_esquerda": 39.5,
		"panturrilha_direita": 40,
		"antebraco_esquerdo": 27.5,
		"id_administrador": 1,
		"id_aluno": 7,
		"data_criacao": "16/07/2024 00:00:00",
		"data_atualizacao": "16/07/2024 20:06:36",
		"obj": "Emagrecer",
		"idademeta": 189,
		"rcq": 57,
		"tmb": 17
	},
	"success": true
}
```

<h3 id="post-login">REQUEST DELETE <kbd>/evaluation/:id</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": {
		"id_avaliacao": 3,
		"braco_direito_contraido": 35.5,
		"braco_direito_relaxado": 32,
		"braco_esquerdo_contraido": 34.8,
		"braco_esquerdo_relaxado": 31.5,
		"agua_corporal": 60.2,
		"torax": 100.5,
		"altura": 175,
		"peso": 70.5,
		"gordura_visceral": 10,
		"massa_ossea": 3.5,
		"cintura": 80,
		"abdomen": 85,
		"quadril": 95,
		"coxa_esquerda": 59.5,
		"coxa_direita": 60,
		"antebraco_direito": 28,
		"panturrilha_esquerda": 39.5,
		"panturrilha_direita": 40,
		"antebraco_esquerdo": 27.5,
		"id_administrador": 1,
		"id_aluno": 7,
		"data_criacao": "24/06/2024 00:00:00",
		"data_atualizacao": "24/06/2024 13:16:34"
	},
	"success": true
}
```
</details>

<hr>
<details>
  <summary>Endpoint Finanças</summary>
      <hr>

| routes | description  
|----------------------|-----------------------------------------------------
| <kbd>GET /finance | retorna as informações do finanças [get details](#get-tasks-user)


<h3 id="post-login">REQUEST GET <kbd>/finance</kbd></h3>

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
	"conteudoJson": [
		{
			"id_financa": 3,
			"data_ocorrida": "18/07/2024",
			"item": "trimestral 2",
			"cliente": "finance",
			"valor_pago": "70.00"
		},
		{
			"id_financa": 4,
			"data_ocorrida": "18/07/2024",
			"item": "Plano Mensal",
			"cliente": "finance",
			"valor_pago": "70.00"
		},
		{
			"id_financa": 5,
			"data_ocorrida": "19/07/2024",
			"item": "Plano Mensal",
			"cliente": "Teste de plano 2",
			"valor_pago": "70.00"
		},
		{
			"id_financa": 6,
			"data_ocorrida": "19/07/2024",
			"item": "Plano Mensal",
			"cliente": "Show",
			"valor_pago": "70.00"
		},
		{
			"id_financa": 7,
			"data_ocorrida": "19/07/2024",
			"item": "trimestral 2",
			"cliente": "finance",
			"valor_pago": "70.00"
		},
		{
			"id_financa": 8,
			"data_ocorrida": "19/07/2024",
			"item": "trimestral 2",
			"cliente": "finance",
			"valor_pago": "70.00"
		},
		{
			"id_financa": 9,
			"data_ocorrida": "19/07/2024",
			"item": "trimestral 2",
			"cliente": "finance",
			"valor_pago": "70.00"
		},
		{
			"id_financa": 10,
			"data_ocorrida": "19/07/2024",
			"item": "trimestral 2",
			"cliente": "finance",
			"valor_pago": "70.00"
		},
		{
			"id_financa": 11,
			"data_ocorrida": "20/07/2024",
			"item": "trimestral 2",
			"cliente": "finance",
			"valor_pago": "70.00"
		},
		{
			"id_financa": 12,
			"data_ocorrida": "20/07/2024",
			"item": "Plano Mensal",
			"cliente": "Victor",
			"valor_pago": "70.00"
		},
		{
			"id_financa": 13,
			"data_ocorrida": "20/07/2024",
			"item": "trimestral",
			"cliente": "Victor",
			"valor_pago": "189.90"
		}
	],
	"success": true
}
```

</details>
<hr>
</details>


## 🌐 Links do Deploy
Você pode acessar o FourDevs GymManager nos seguintes links:

- **Painel Administrativo**:
  <a href="https://gym.fourdevs.com.br" target="_blank">Aqui</a>

- **Baixar App**:
  <a href="https://fourdevs.com.br/gym" target="_blank">Aqui</a>

## 👥 Equipe
- <a href="https://github.com/wilkenio" target="_blank">@wilkenio</a> - Wilkenio Pereira da Silva
- <a href="https://github.com/GutembergLima05" target="_blank">@Gutemberg</a> - Gutemberg 
- <a href="https://github.com/victortads" target="_blank">@Víctor</a> - Víctor Gabriel de Santana
- <a href="https://github.com/RenanCampelo" target="_blank">@Renan</a> - Renan Campêlo

## 📱 Figma
Acesse nossos protótipos no Figma: <br>
- <a href="https://www.figma.com/proto/NSAejy0ekxBHwfaCw4Pd0w/FourDevGym?node-id=77-45&starting-point-node-id=77%3A45" target="_blank">Protótipo do Painel Adm</a><br>
- <a href="https://www.figma.com/proto/x3W7FHYZJkkC6Y7L12FWNf/AppFourDevsGym?node-id=92-2&t=Lsr5ZXSCbprfOZa9-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1" target="_blank">Protótipo do App aluno</a>

## 🔐 Tipos de Login
No sistema web do FourDevs GymManager, há três tipos de login disponíveis:<br>

1. **Administrador:** Acesso total às funcionalidades do sistema, incluindo controle financeiro, gerenciamento de treinos e processamento de pagamentos. 
   - Email: dono@gmail.com
   - Senha: adm12345

2. **Recepcionista:** Acesso limitado para gerenciar o atendimento ao aluno, incluindo o registro de novos alunos,etc.
   - Email: recepcionista@gmail.com
   - Senha: adm12345

3. **Personal Trainer:** Acesso para gerenciar e visualizar os treinos dos alunos, acompanhar o progresso e avaliar o desempenho dos alunos,etc.
   - Email: personal@gmail.com
   - Senha: adm12345

### 📲 Login no Aplicativo

Para acessar o aplicativo, é necessário pegar a **matrícula** e **data de nascimento** na página de **alunos**. Isso garante que cada aluno tenha um acesso personalizado e seguro às suas informações de treino e pagamento.

