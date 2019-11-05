# BASS(for MacOS)

## Introduce BASS Project 
- 소개글

## Team
- 이상아
- 문영선 

## Prerequisites
- Atom v1.40.1 (x64)
- node v12.13.0
- npm v6.12.0
- git version 2.20.1 (Apple Git-117)
- docker v19.03.4 

## Project Setting

### 1. Install docker
```bash
brew install docker
```

- Test your installation 
```bash
docker --version

docker-compose --version
```

### 2. Install nodejs
- https://nodejs.org/en/ //Install with the version that's right for you
(We are version is 'macOS 64bit ver.13.0.1 Current')

- Test your installation 
```bash
node -v

npm -v

node

console.log('hello');
```

### 3. Install express 

```bash
npm install express --save
```

- Test your installation 
```bash
DEBUG=backend:* npm start
```
### 4. Install mongoDB
```bash
docker pull mongo   //docker pull command
```


### 5. Run mongoDB 
```bash
docker run --name mongo -d mongo  //백엔드로 실행
```

- Check run mongodb
```bash
docker ps
```










