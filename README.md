# Pichangapp

### Run
```
$ npm install 
$ node app.js
```
## Mongodb
```
$ mongod --dbpath ./data
```
# API

## /usuario
#### POST
```
{
    "name" : String,
    "email" : String,
    "password" : String,
    "city" : String,
    "position" : String
}
```

## /


# Models

## User
```
{
    "id" : String unique,
    "name" : String,
    "username": String unique,
    "email" : String unique,
    "password" : String,
    "city" : String,
    "position: : String,
    "friends" : [usernames],
    "teams" : [team.name],
    "partidos" : [] 
}
```
## Team
```
{
    "name" : String unique, 
    "cap" : User.username,
    "shield" : String,
    "calification" : String,
    "players" : [playerx.username],         
    "matches" : [],
    "nvotes" : Number,
    "votes" : Number
}
```

## Match
```
{
    "name" : Optional
    "author" : User.username,
    "local" : team1.name,
    "guest" : team2.name,
    "state" : {
        0 : "Por jugar",
        1 : "Jugando",
        2 : "Jugado",
    },
    "location" : String o GPS location,
    "date" : Date,
    "price" : $$$$,
    "time" : horas que dura el partdio 
}
```