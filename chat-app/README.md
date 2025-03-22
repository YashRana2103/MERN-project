# Snappy - Chat Application

Snappy is chat application build with the power of MERN Stack. You can find the tutorial [here](https://www.youtube.com/watch?v=otaQKODEUFs)

![login page](./images/snappy_login.png)

![home page](./images/snappy.png)

### Requirements

- [Nodejs](https://nodejs.org/en/download)
- [Mongodb](https://www.mongodb.com/docs/manual/administration/install-community/)

For Frontend.

```shell
cd public
npm start
```

or

```shell
cd public
yarn start
```

For Backend.

Open another terminal in folder, Also make sure mongodb is running in background.

```shell
cd public
nodemon index.js
```

or

```shell
cd server
yarn start
```

Done! Now open localhost:3000 in your browser.

#### Second Method

- This method requires docker and docker-compose to be installed in your system.
- Make sure you are in the root of your project and run the following command.

```shell
docker compose build --no-cache
```

after the build is complete run the containers using the following command

```shell
docker compose up
```

now open localhost:3000 in your browser.
