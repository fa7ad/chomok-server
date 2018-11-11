# chomok-server

Express backend api for [chomok.xyz](https://chomok.xyz)

## Running

### In development

```bash
$ npm run dev
```
or
```bash
$ yarn dev
```

### In Production

First, transpile the code to ES5 (don't use babel-node in production).

Use a process manager like **pm2**, make sure to set these environment variables

**CWD**: Working directory of the server  
**NODE_ENV**: Set this to 'production' to enable some security measures
