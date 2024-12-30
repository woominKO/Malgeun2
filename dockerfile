<<<<<<< HEAD
# 베이스 이미지 선택
FROM node:18-alpine

# 작업 디렉터리 설정
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install

RUN apt-get update && apt-get install -y git


# 소스 코드 복사
COPY . .

# 실행 권한 추가
RUN chmod +x server.js

# 포트 설정
EXPOSE 3000

# 애플리케이션 실행 명령
=======
# 1. 베이스 이미지 선택
FROM node:18-alpine

# 2. 작업 디렉터리 설정
WORKDIR /app

# 3. 필수 도구 및 Git 설치
RUN apk update && apk add --no-cache git

# 4. 의존성 설치
COPY package*.json ./
RUN npm install

# 5. 소스 코드 복사
COPY . .

# 6. 실행 권한 추가
RUN chmod +x server.js

# 7. 포트 설정
EXPOSE 3000

# 8. 애플리케이션 실행 명령
>>>>>>> 7a79d26f79737c252cb1bf1e8d3ab32b6c1cde56
CMD ["node", "server.js"]
