## Description

SetTheory-API

## Project setup

Run the following command first.

```bash
$ npm install
```

Use the `env.template` file to create your own `.env` file in the root of this repo. This file is excluded from source control and so you need to create this manually if it doesn't exist.
Populate the environment variables as necessary.

Then run the following commands to have Prisma generate the Prisma Client API classes.

```bash
npx prisma db pull
npx prisma generate
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
