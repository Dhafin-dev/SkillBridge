@echo off
set "PATH=C:\laragon\bin\php\php-8.3.33-Win32-vs16-x64;C:\laragon\bin\composer;%PATH%"
echo =================================================================
echo   Menjalankan SkillBridge Hub Web Application (Laravel 11)
echo   URL: http://127.0.0.1:8000 (atau gunakan http://skillbridge.test di Laragon)
echo =================================================================
php artisan serve --port=8080
