## Connecting node.js with the backend 

Before you run the app you need to make some backend setup with database and node js. 

In this app we have created a database named greenhome and table named test. 
You can find information about how to create a table [here](https://github.com/GreenHomeNow/postgres/blob/master/server/db/databaseCommands.md).


### Production Server Commands 

Connect to AWS EC2 instance using following command 

```
 ssh -i "authentication file.yelp" ubuntu@
```




### Pm2 
[pm2](https://pm2.keymetrics.io)

1. List services running on web server 
```
pm2 status 
```

2. Stop a web service 

```
pm2 stop 0
```

3. Delete a web service 

```
pm2 delete 0
```

4. Starting a web service 
```
pm2 start apps/yelp-app/postgres/server/server.js
```

5. Initaiating a service

```
pm2 startup
```
one more command followed after theis shown in terminal

6. Restart web service 
```
pm2 restart
```

### [NGINX](https://www.nginx.com)
