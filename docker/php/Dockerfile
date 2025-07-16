FROM php:8.2-fpm

# ── Install system dependencies and PHP extensions ──
RUN apt-get update \
 && apt-get install -y libfreetype6-dev libjpeg-dev libpng-dev libonig-dev libxml2-dev zip unzip \
 && docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd


RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
 && apt-get install -y nodejs \
 && npm install -g npm

# ── Install Composer ──
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ── Set working directory ──
WORKDIR /var/www/html

# ── 1. Copy composer files and install dependencies ──
COPY laravel-app/composer.json laravel-app/composer.lock ./
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-scripts

# ── 2. Copy entire Laravel application ──
COPY laravel-app/ .

# ── 3. Run Laravel post-install setup ──
RUN php artisan package:discover --ansi \
 && composer dump-autoload --optimize

# ── 4. Set permissions ──
RUN chown -R www-data:www-data /var/www/html \
 && chmod -R 755 /var/www/html

# ── 5. Expose PHP-FPM port ──
EXPOSE 9000

CMD ["php-fpm"]
