# Temel imaj
FROM node:18

# Çalışma dizinini ayarla
WORKDIR /app

# Sadece bağımlılık dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları kur
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# Ortam değişken dosyasını kopyala (önemli)
COPY .env.local .env.local

# Next.js uygulamasını derle
RUN npm run build

# Uygulama portunu aç
EXPOSE 3000

# Uygulama başlat
CMD ["npm", "run", "start"]
