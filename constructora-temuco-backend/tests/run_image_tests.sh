#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== EJECUTANDO TESTS DEL SISTEMA DE IMÁGENES ===${NC}\n"

# Configurar entorno de testing
echo -e "${YELLOW}Configurando entorno de testing...${NC}"
php artisan config:clear --env=testing
php artisan migrate:fresh --env=testing

echo -e "\n${YELLOW}=== TESTS UNITARIOS ===${NC}"

echo -e "\n${BLUE}1. Testing ImageService...${NC}"
php artisan test tests/Unit/ImageServiceTest.php --env=testing

echo -e "\n${BLUE}2. Testing ProjectImage Model...${NC}"
php artisan test tests/Unit/ProjectImageModelTest.php --env=testing

echo -e "\n${YELLOW}=== TESTS DE FEATURE ===${NC}"

echo -e "\n${BLUE}3. Testing ProjectImage API...${NC}"
php artisan test tests/Feature/ProjectImageTest.php --env=testing

echo -e "\n${YELLOW}=== RESUMEN COMPLETO ===${NC}"
php artisan test tests/Unit/ImageServiceTest.php tests/Unit/ProjectImageModelTest.php tests/Feature/ProjectImageTest.php --env=testing

echo -e "\n${GREEN}¡Tests del sistema de imágenes completados!${NC}"