# PHP 8.2 FPM imajını kullan
FROM php:8.2-fpm

# Gerekli sistem paketlerini yükle
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev \
    libzip-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl gd

# Composer kur
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Çalışma dizinini ayarla
WORKDIR /var/www

# Proje dosyalarını kopyala
COPY . .

# Bağımlılıkları yükle
RUN composer install --no-interaction --optimize-autoloader

# Laravel dosya izinlerini ayarla
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage /var/www/bootstrap/cache

# Portu dışa aç
EXPOSE 8000

# Laravel uygulamasını başlat
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
