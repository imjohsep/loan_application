# Loan Applications

## Standup

Run `npm install` to pull down all of our dependencies.

### Start the application

```sh
npm start
```

The webserver will be accessible on [localhost:8000](http://localhost:8000)

### Mongo

Open up a new terminal tab and run `mongo`
If `mongod` is alread running you will open up a new mongo session.

```sh
MongoDB shell version: 3.2.4
connecting to: test
>
```

__If not__,  you will need to start mongo with the `mongod` command.

And if you don't have mongo... you will need to install it.

## Usage

1. Fill out the application on the home page.
1. Retrieve the details of an applicaiton by visiting `localhost:8000/loans/:loanId`