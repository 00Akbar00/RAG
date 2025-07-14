FROM php:8.2-fpm

# system deps + PHP extensions
RUN apt-get update \
 && apt-get install -y libpng-dev libonig-dev libxml2-dev zip unzip \
 && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Composer CLI
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# 1) Copy only composer files and install without scripts
COPY src/composer.json src/composer.lock ./
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-scripts

# 2) Copy all your application source (now artisan is present)
COPY src/ .

# 3) Now run the “package discover” and regenerate optimized autoload
RUN php artisan package:discover --ansi \
 && composer dump-autoload --optimize

# set permissions
RUN chown -R www-data:www-data /var/www/html \
 && chmod -R 755 /var/www/html

EXPOSE 9000
CMD ["php-fpm"]
