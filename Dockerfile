# Use uma imagem oficial do Node.js como base
FROM node:20.14.0 AS build 

# Define o diretório de trabalho
WORKDIR /app/backend

# Copia o package.json e package-lock.json antes do código da aplicação
# Isso permite que o Docker cache as camadas de dependência
COPY backend/package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia o código da aplicação
COPY backend .

# Reinstala o bcrypt
RUN npm rebuild bcrypt --build-from-source

# Exponha a porta em que a aplicação irá rodar
EXPOSE 5000

# Define o comando padrão a ser executado quando o contêiner iniciar
CMD ["npm", "run", "dev"]
