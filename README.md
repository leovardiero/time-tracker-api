STEPS:
1. Create and edit the Migration 
2. Create the table on DB
3. Create the Model

Create Migration:
```
npx sequelize migration:create --name=<name>
```

Create Table:
```
npx sequelize db:migrate
```

Delete Migration in case of error
```
npx sequelize db:migrate:undo
```
===============
seeds:
```
npx sequelize seed:generate --name=<name>
```

```
npx sequelize db:seed:all
```

===

fix nginx:
sudo pkill -f nginx & wait $!
sudo systemctl start nginx

===

Start mariadb container
docker run --name mariadbtimetracker -e MYSQL_ROOT_PASSWORD=123456 -p 5000:3306 -d mariadb:latest
