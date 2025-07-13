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
openssl aes-256-cbc -d -pbkdf2 -in .env.local.enc -out .env.local
```

Run the following command first.

```bash
$ npm install
```

Use the `env.template` file to create your own `.env` file in the root of this repo. This file is excluded from source control and so you need to create this manually if it doesn't exist.
Populate the environment variables as necessary.

Then run the following commands to have Prisma generate the Prisma Client API classes.

```bash
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
