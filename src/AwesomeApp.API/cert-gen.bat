if not exist ".cert\" mkdir .cert

cd .cert

set password=CertRandomPassword

dotnet dev-certs https --export-path AwesomeApp.API.pfx --password "%password%"
dotnet dev-certs https --trust

(
	echo ASPNETCORE_Kestrel__Certificates__Default__Path="/home/app/https/AwesomeApp.API.pfx"
	echo ASPNETCORE_Kestrel__Certificates__Default__Password="%password%"
) > kestrel.env
