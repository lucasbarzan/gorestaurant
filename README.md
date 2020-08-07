<h1 align="center">
     🥣 <a href="#" alt=""> GoRestaurant </a>
</h1>

<h3 align="center">
    🥣 App web/mobile de cardápio para restaurante que permite a criação, remoção e atualização dos pratos 🍽️
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/lucasbarzan/gofinances?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/lucasbarzan/gofinances">
  
  <a href="https://github.com/lucasbarzan/gofinances/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/lucasbarzan/gofinances">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   <a href="https://github.com/lucasbarzan/gofinances/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/lucasbarzan/gofinances?style=social">
  </a>
</p>

<h4 align="center">
	Concluído 🚀
</h4>

Tabela de conteúdos
=================

   * [Sobre o projeto](#sobre-o-projeto)
   * [Funcionalidades](#funcionalidades)
   * [Layout](#layout)
     * [Web](#layout-web)
     * [Mobile](#layout-mobile)
   * [Como executar o projeto](#como-executar-o-projeto)
     * [Pré-requisitos](#pre-requisitos)
     * [Rodando a fake API (servidor)](#rodando-o-backend-servidor)
     * [Rodando a aplicação web (Frontend)](#rodando-a-aplicacao-web-frontend)
   * [Tecnologias](#tecnologias)
     * [Website](#tecnologias-website)
     * [Mobile](#tecnologias-mobile)
     * [Utilitários](#utilitarios)
   * [Como contribuir no projeto](#como-contribuir)
   * [Autor](#autor)
   * [Licença](#licenca)



## 💻 Sobre o projeto <a name="sobre-o-projeto"></a>

🥣 O GoRestaurant é um app de cardápio para restaurante com interface tanto para web quanto para mobile que permite a criação, remoção e atualização de pratos de comida.


Projeto desenvolvido durante o bootcamp **GoStack** oferecido pela [Rocketseat](https://rocketseat.com.br/).

---

## ⚙️ Funcionalidades <a name="funcionalidades"></a>

- [x] Restaurantes podem utilizar a plataforma web para:
  - [x] Cadastrar novos pratos
  - [x] Editar pratos
  - [x] Listar os pratos
  - [x] Remover pratos
  - [x] Alterar a disponibilidade dos pratos
- [x] Os usuários tem acesso ao app mobile, onde podem:
  - [x] Listar os pratos de comida e categorias
  - [x] Filtrar pratos de comida por busca ou por categorias
  - [x] Listar seus pratos favoritos
  - [x] Realizar um pedido

---

## 🎨 Layout <a name="layout"></a>

O layout da aplicação está disponível no Figma:

<a href="https://www.figma.com/file/CASrVpJP7e0kAPOULOzmXQ/GoRestaurant">
  <img alt="Layout web no Figma" src="https://img.shields.io/badge/Acessar%20Web%20-Figma-%2304D361">
</a>

<a href="https://www.figma.com/file/QOjjPrujxbwrzzXAGzSzHG/GoRestaurant-Mobile?node-id=0%3A1">
  <img alt="Layout mobile no Figma" src="https://img.shields.io/badge/Acessar%20Mobile%20-Figma-%2304D361">
</a>

### Web <a name="layout-web"></a>

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="Screenshot web 1" src="./assets/web-dashboard.svg" height="230px">

  <img alt="Screenshot web 2" src="./assets/web-prato.svg" width="400px">
</p>

### Mobile <a name="layout-mobile"></a>

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="Screenshot mobile 1" src="./assets/mobile-splash.svg" width="200px">

  <img alt="Screenshot mobile 2" src="./assets/mobile-home.svg" width="200px">
  
  <img alt="Screenshot mobile 3" src="./assets/mobile-orders.svg" width="200px">
  
  <img alt="Screenshot mobile 4" src="./assets/mobile-favorites.svg" width="200px">
</p>

---

## 🚀 Como executar o projeto <a name="como-executar-o-projeto"></a>

Este projeto é divido em duas partes:
1. Frontend Web (pasta web) 
2. Frontend Mobile (pasta mobile)

💡 Tanto o Frontend Web quanto o Mobile utilizam uma fake API que roda na porta 3333

### Pré-requisitos <a name="pre-requisitos"></a>

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

#### 🎲 Rodando a fake API (servidor) <a name="rodando-o-backend-servidor"></a>

```bash

# Clone este repositório
$ git clone git@github.com:lucasbarzan/gorestaurant.git

# Acesse a pasta do projeto no terminal/cmd
$ cd gorestaurant

# Vá para a pasta do frontend
$ cd web

# Instale as dependências
$ npm install

# Execute o script da fake API
$ npm run json-server server.json -p 3333

# O servidor inciará na porta:3333 - acesse http://localhost:3333 

```


#### 🧭 Rodando a aplicação web (Frontend) <a name="rodando-a-aplicacao-web-frontend"></a>

```bash

# Clone este repositório
$ git clone git@github.com:lucasbarzan/gorestaurant.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd gorestaurant

# Vá para a pasta do frontend
$ cd web

# Instale as dependências (caso não as tenha instalado ainda)
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run start

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000

```

---

## 🛠 Tecnologias <a name="tecnologias"></a>

As seguintes ferramentas foram usadas na construção do projeto:

-   **[EditorConfig](https://editorconfig.org/)**
-   **[ESLint](https://eslint.org/)**
-   **[Prettier](https://prettier.io/)**
-   **[json-server](https://github.com/typicode/json-server)**

#### **Website**  ([React](https://reactjs.org/)  +  [TypeScript](https://www.typescriptlang.org/)) <a name="tecnologias-website"></a>

-   **[React Router Dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)**
-   **[React Icons](https://react-icons.github.io/react-icons/)**
-   **[React Modal](https://github.com/reactjs/react-modal)**
-   **[Unform](https://github.com/Rocketseat/unform)**
-   **[Styled Components](https://styled-components.com/)**
-   **[Axios](https://github.com/axios/axios)**
-   **[Yup](https://github.com/jquense/yup)**

> Veja o arquivo  [package.json](https://github.com/lucasbarzan/gofinances/blob/master/web/package.json)

#### **Mobile**  ([React Native](https://reactnative.dev/)  +  [TypeScript](https://www.typescriptlang.org/)) <a name="tecnologias-mobile"></a>

-   **[React Native Gesture Handler](https://github.com/software-mansion/react-native-gesture-handler)**
-   **[React Native Screens](https://github.com/software-mansion/react-native-screens)**
-   **[React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)**
-   **[React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)**
-   **[Styled Components](https://styled-components.com/)**
-   **[Axios](https://github.com/axios/axios)**

> Veja o arquivo  [package.json](https://github.com/lucasbarzan/gofinances/blob/master/mobile/package.json)

#### **Utilitários** <a name="utilitarios"></a>

-   Protótipo:  **[Figma](https://www.figma.com/)**
-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
-   Teste de API:  **[Insomnia](https://insomnia.rest/)**
-   Fontes:  **[Poppins](https://fonts.google.com/specimen/Poppins)**


---

## 💪 Como contribuir no projeto <a name="como-contribuir"></a>

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`

---

## 🦸 Autor <a name="autor"></a>

<a href="https://github.com/lucasbarzan/">
 <img src="https://avatars2.githubusercontent.com/u/25365429?s=460&u=ac94c8da0e69db2558f031d01dbca5c60aa19b77&v=4" width="100px" alt="Lucas Barzan" />
 <br />
 <sub><b>Lucas Barzan</b></sub></a>
 <br />

[![Twitter Badge](https://img.shields.io/badge/-@lucasbarzand-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/lucasbarzand)](https://twitter.com/lucasbarzand) [![Linkedin Badge](https://img.shields.io/badge/-LucasBarzan-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/lucasbarzan/)](https://www.linkedin.com/in/lucasbarzan/) 
[![Gmail Badge](https://img.shields.io/badge/-lucasbarzand@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:lucasbarzand@gmail.com)](mailto:lucasbarzand@gmail.com)

---

## 📝 Licença <a name="licenca"></a>

Este projeto esta sob a licença [MIT](./LICENSE).

Feito com ❤️ por Lucas Barzan 👋🏽 [Entre em contato!](https://www.linkedin.com/in/lucasbarzan/)
