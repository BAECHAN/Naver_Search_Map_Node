# Node.js 18.17.1 버전의 이미지를 베이스로 사용
FROM node:18.17.1

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 포트 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["node", "server.js"]

