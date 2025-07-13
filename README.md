## Description

SetTheory-API

## Project setup

### Decrypt environment file

There is an encrypted env.local.enc file in the root of the repo that was created using the command:

```bash
openssl aes-256-cbc -pbkdf2 -salt -in .env.local -out .env.local.enc
```

You will first need to decrypt the file to get the environment variables. Run the following command to decrypt:

```bash
openssl aes-256-cbc -d -pbkdf2 -in .env.local.enc -out .env
```

Rename the file to `.env`.

### Install deps

Run the following command first.

```bash
$ npm install
```

### Generate Prisma classes for db tables

Run the following commands to have Prisma generate the Prisma Client API classes.

```bash
npm run prisma-generate
```

## Build

```bash
npm run build
```

## Run

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## GraphQL Playground

Run the app:

```bash
npm run start:dev
```

Go to http://localhost:4000/graphql for the playground
