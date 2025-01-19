# ONITO web application backend

## Dependencies
Node 22.13.0
Other dependencies listed in `package.json`.

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
