# pg-santosh

Hi !!

## Things taken care primarily:

1. Since it is typical booking application taken care of double spending issue 
(i.e: Deadlock scenarios where two different users booked for same appointment)

2. Taken care there is no bottle neck which degrades the performance

3. Datetime ISO String is getting saved in DB to ensure that all the datetime values in disk are in UTC Timezone
(It standardizes the datetime values stored)


## Things that I enjoyed in the Challenge

1. Timezone Handling 
(It is my first time handling between various timezones)

2. Architecting the API with Global Error Handling and Seperation of Concerns


## Things I learnt

1. Node-Postgres Connection Pools and Clients
2. UnhandledPromiseRejectionWarning


## Things I could have done better

1. Logging
2. Proper Validations (Added most of the Validations, still few haven't validated)
3. Better Authentication (Wrote a very basic authentication due to time constraint)
4. UI 



# Technology

## Stack

1. React (With simple CSS)
2. Express
3. Postgres

`Note: Used postgres, since got to know that PeopleGrove uses postgres from the interviewer`

Contact me anytime @
- +91 8189852694
- santikage@gmail.com
