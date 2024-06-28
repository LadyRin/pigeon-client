npm install
npm run build

cp -r /app/dist/* /usr/local/apache2/htdocs/

chmod -R 777 /usr/local/apache2/htdocs/

httpd-foreground