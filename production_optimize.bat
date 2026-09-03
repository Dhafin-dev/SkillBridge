@echo off
echo =================================================================
echo   Menjalankan Optimasi Produksi Laravel (Config, Route, View Cache)
echo =================================================================
set "PATH=C:\laragon\bin\php\php-8.3.33-Win32-vs16-x64;C:\laragon\bin\composer;%PATH%"

php artisan config:clear
php artisan route:clear
php artisan view:clear

php artisan config:cache
php artisan route:cache
php artisan view:cache

echo [OK] Optimasi produksi selesai!
