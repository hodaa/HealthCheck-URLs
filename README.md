## Montior  Api
This is an uptime monitoring RESTful API server which allows authorized users to enter URLs 
they want monitored, and get detailed uptime reports about their availability, average response time, and total uptime/downtime.



## Installation

* `docker-compose up -d`
* add




## Documentation

Hit this url using Get Method

`http://localhost:4000/docs`




<br />

## Architecture

* If you want  to add a new Data provider you can go to
  `app/DataProvider/` and add new class extends HotelDataMapper class  and map name from your provider to system names.
  

  

## Design Pattern Used

1- `Abstract Factory` pattern to encapsulate creation of the data provider object  from the business logic

2- `Reposiotory` pattern  to get data form datasource (Apis).

3- `Service` pattern I added all business logic in separate classes.



<br>


## Testing
From Nodejs image
* `npm test`


## Tools
* Express
* Mongo
* Docker
* Swagger


# standard --fix






    
