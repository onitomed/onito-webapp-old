# ONITO web application backend

## Dependencies
Dependencies listed in `package.json`.

Ran on NodeJS v22.13.0

## Running the project
### Install dependencies
In directory with `package.json`, run

```bash
npm i
```

### Configure database and JWT secret
Fill in MongoDB database URI and JWT secret fields in `backend/config/config.env`. By default, they are filled with placeholder values.

### Development run (with nodemon)
```bash
npm run server
```

### Production run
```bash
npm run start
```
