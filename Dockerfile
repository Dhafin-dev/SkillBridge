# Dockerfile untuk Aplikasi Web Laravel 11 SkillBridge Hub
FROM php:8.3-cli-alpine

WORKDIR /var/www/html

# Install dependensi sistem dan ekstensi PHP yang diperlukan (PostgreSQL pdo_pgsql, zip, mbstring)
RUN apk add --no-cache \
    postgresql-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    oniguruma-dev \
    && docker-php-ext-install pdo pdo_pgsql pdo_mysql zip mbstring bcmath

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Salin source code
COPY . .

# Install dependensi Composer produksi
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Set permission storage
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 8080

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
