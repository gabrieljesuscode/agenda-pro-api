# Agenda Pro API

Backend API para gerenciamento de clientes, agendamentos e autenticação.

## Stack
- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- JWT
- Zod
- Swagger
- Vitest

## Recursos
- Registro e login de usuários
- CRUD de clientes
- CRUD de agendamentos
- Dashboard com resumo de clientes e agendamentos
- Documentação Swagger disponível em `/api-docs`

## Requisitos
- Node.js 18+
- PostgreSQL
- Variáveis de ambiente:
  - `DATABASE_URI`
  - `JWT_SECRET`

## Instalação
```bash
npm install
```

## Rodar em desenvolvimento
```bash
npm run dev
```

A aplicação será iniciada em `http://localhost:3000`.

## Documentação da API
A documentação Swagger está disponível em:

```text
http://localhost:3000/api-docs
```

## Scripts
- `npm run dev` - Inicia o servidor em modo desenvolvimento com `tsx`
- `npm run build` - Compila o TypeScript para `dist`
- `npm start` - Inicia a aplicação a partir da pasta `dist`
- `npm test` - Executa a suíte de testes com `vitest`

## Testes
Os testes usam `vitest` e `supertest`. Para executar:

```bash
npm test
```

## Endpoints principais
- `POST /auth/register` - Registro de usuário
- `POST /auth/login` - Login e geração de token JWT
- `POST /clients` - Criação de cliente (requires auth)
- `GET /clients` - Listar clientes (requires auth)
- `GET /clients/:id` - Buscar cliente por ID (requires auth)
- `PATCH /clients/:id` - Atualizar cliente (requires auth)
- `DELETE /clients/:id` - Deletar cliente (requires auth)
- `POST /appointments` - Criar agendamento (requires auth)
- `GET /appointments` - Listar agendamentos (requires auth)
- `PATCH /appointments/:id` - Atualizar agendamento (requires auth)
- `DELETE /appointments/:id` - Deletar agendamento (requires auth)
- `GET /dashboard` - Resumo do dashboard (requires auth)
- `GET /dashboard/upcoming` - Próximos agendamentos (requires auth)

## Observações
A conexão com o banco é configurada via `DATABASE_URI` e `PrismaPg`.
Certifique-se de ter o banco PostgreSQL rodando e a variável `JWT_SECRET` definida.
