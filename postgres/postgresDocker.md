# Postgres Docker

Assumption is that you already have Docker installed. 
Make sure your installation is working with

`docker run hello-world`

You should expect something like

`Hello from Docker!
This message shows that your installation appears to be working correctly.`



We’ll be using the an official postgres image from dockerHub, https://hub.docker.com/_/postgres

Specific with tag 11.5

```
docker run --name postgres-01 \
-e POSTGRES_PASSWORD=mysecretpassword \
-e POSTGRES_USER=db_admin \
-e POSTGRES_DB=bookshelf \
-p 5432:5432 \
-d postgres:11.5
```

This will create the postgres container it will now be running.

```
docker ps
```

To query the db first exec onto the container

```
docker exec -it postgres-01 /bin/bash
```

Now your inside the container you’ll have access to psql.

```
psql -h localhost -d bookshelf -U db_admin
```

By running `\l` you’ll see a list of databases. 

For more information on why there are three additional databases, read the following. https://www.postgresql.org/docs/11/manage-ag-templatedbs.html


You can see queries are against the bookshelf database via the command line.  
`bookshelf=# `

`\dt`  
Will list the tables within the `bookshelf` database. 

You can run Postgres Statements directly here, 
```
CREATE TABLE app_user(
	user_id serial PRIMARY KEY,
	username VARCHAR (255) UNIQUE NOT NULL,
	password VARCHAR (255) NOT NULL,  
	email VARCHAR (355) UNIQUE NOT NULL
);
```
View the tables  
`\dt`  
View the table in detail  
`\d app_user`

Insert some data.  
```
INSERT INTO app_user(username, password, email) VALUES('red', 'redpassword', 'red@email.com');
INSERT INTO app_user(username, password, email) VALUES('blue', 'bluepassword', 'blue@email.com');
```

View the data you have inserted.  
`SELECT * FROM app_user;`

You don’t need to be on the container to run the statements, these can also be done from the host.
Exit psql and the container with ‘\q’. When you back on the host you can query the db with the following

```
docker exec -it postgres-01 psql \
-h localhost \
-U db_admin \
-p 5432 \
-d bookshelf \
-c " 
SELECT * 
FROM app_user;
"
```

So at this point we have been able to 
- Start the Postgres container with an initial DB
- Exec onto the Postgres container
- Create a table
- Insert data into that table
- Select the data.


Next step is taking a dump of our data so we can restore it against another postgres db.
As with the queries there a few ways that we can do this,

From the host you can run

```
docker exec -t postgres-01 pg_dumpall -c -U postgres > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql
```
 
It should generate a name similar to,   
`dump_15-09-2019_14_10_39.sql`  
view the contents as it will show errors in the file if there was an error.


Stop and Delete the current postgres image  
`docker stop postgres-01 && docker rm postgres-01`  
Restart it with the initial docker run command

To restore the data run the following  
```
cat dump_15-09-2019_14_10_39.sql | docker exec -i postgres-01 psql -U db_admin -d bookshelf
```

If you run the select command again, you will see the data has been restored against our new db.
```
docker exec -it postgres-01 psql \
-h localhost \
-U db_admin \
-p 5432 \
-d bookshelf \
-c " 
SELECT * 
FROM app_user;
"
```