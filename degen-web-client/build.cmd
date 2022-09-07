call uglifyjs source\api.js -o ..\api.js --compress --mangle
copy "source\degen-app.html" "..\index.htm" /Y