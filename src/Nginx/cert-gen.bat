if not exist ".cert\" mkdir .cert

cd .cert

openssl genrsa -out client.key 2048
openssl req -new -key client.key -out client.csr
openssl x509 -req -in client.csr -signkey client.key -out client.crt