# Etapa de build
FROM node:22 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Executa o build do Vite
RUN npm run build

# Etapa de produção
FROM node:22-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas o necessário da etapa de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

# Expõe a porta (ajuste conforme necessário)
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["node", "src/server/api.js"]
