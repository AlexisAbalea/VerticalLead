# Utiliser une image NGINX comme base
FROM nginx:latest

# Copier les fichiers Angular dans le dossier NGINX
COPY dist/vertical-lead/browser/ /usr/share/nginx/html

# Remplacer la configuration par défaut de NGINX si nécessaire
COPY nginx.conf /etc/nginx/conf.d/default.conf
