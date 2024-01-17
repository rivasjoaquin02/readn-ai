# Readn - Books Full Stack App

Currently under development

## What is this app? 🤔

This app is a side-project, 👍 the goal is to build the Netflix/Plex of books 📚 
An app that can be hosted easly locally like plex and you can connect with a locally/remotely hosted AI

## Motivation

I allways find difficult read tecnical books and other kinds of books 
(should be great to have and AI available integrated to ask for help or for interesting questions)

## Currently Implemented Features
- [x] 🤖 Chat with local AI
  - [x] Ollama (llama2)
  - [ ] Train with documments
  - [ ] be capable of swapping the model (eg: OpenAI)
- [ ] 🗝️ Auth
  - [ ] role based auth
- [ ] 📊 Admin Dashboard
  - [ ] add/remove/update books
  - [ ] train ai with new recent added books
- [ ] 📕 PDF reader

## 🚀 Quick Start

This setup proccess will be much easier in the future when i change it to a docker-compose file
Mean while here is the manual setup 

### Clone Repo
```bash
git clone https://github.com/rivasjoaquin02/readn-ai
cd readn-ai
```

### Setup Nextjs

Prerequisites
- nodejs > 18
- npm or pnpm or yarn or bun

```bash
cd app
pnpm install
pnpm run dev|seed|start
```
Open 

### Setup DB 

Prerequisites
- docker & docker-compose

```bash
cd services

# change the host/port/user/pass/db in the docker-compose.yml
vim docker-compose.yaml

docker compose up -d

# put the same host/port/user/pass/db in the app/.env
vim app/.env 
```

### Setup Ollama model (local ai)
[Ollama](https://github.com/jmorganca/ollama/)
[Modelfile](https://github.com/jmorganca/ollama/blob/main/docs/modelfile.md)

Prerequisites
- ollama

```bash
cd models
ollama create [modelname] -f Modelfile

# start the ollama instance
ollama serve
```

## Tech used
- [Nextjs](https://nextjs.org/) (The React Framework)
  - [Shadcn](https://github.com/shadcn-ui/ui) + [Tailwindcss](https://tailwindcss.com/)
  - [Auth.js](https://github.com/nextauthjs/next-auth)
  - [Postgres.js](https://github.com/porsager/postgres) 
- Postgres (db and embeddeding store)
- [Ollama](https://github.com/jmorganca/ollama) (llama2 model)

## Usage 

## Contributing
If you want to make a pull request and help me build this feel free
Or suggest any feature
