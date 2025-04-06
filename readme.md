This is a base node js project template, which anyone can use as it has been prepared, by keeping some of the most important code principles and project management recommendations. Feel free to change anything.

`src` -> Inside the src folder all the actual source code regarding the project will reside , this will not include any kide of tests. (You might want to amke separate tests folder)

Lets atke a look inside the `src` folder

- `config` -> In this folder anything and everything regarding any configuration o: setup of a library or module will be done. For example : seeting up `dotenv` so that we can use the enviroment variable anywhere in a cleaner fashion, this is done in the `server-config.js`. One more example can be to setup you logging that can help you to prepare meaningful logs, so configuration for this library should also be done here.

-`routes` -> In the routes folder , we register a routes an dthe corresponding middleware and controllers to it .

- `middleware` -> they are just going to intercept the incoming request and do some pre processing before it reaches the controller. For example : authentication, authorization, logging etc.

- `controllers` -> they are king of the last middleware as post them you call you business layer to execute
  the business logic. In controllers we just receive the incoming request and data the pass it to business layer, and onece nusiness layer return an output, we structure the API response in controller and send the output.

- `repositories` -> this folder contains all the the logic using which we interact the DB by writing , all the raw queries  or ORM queries will go here .

- `services` -> contains the business logic and interact with repositories for data from the database .

- `utils` -> contains helper methods, error classes etc.

### Setup the project 
 - Download this template from github and open it in your favourite text editor.
 -Go inside the folder path and execute the following command in your terminal.
 ```
  npm install
 ```
 - In the root directory create a `.env` file and add your environment variables in it. For example :  
  
   ```
     PORT = <port number of your choice>
   ```
   ex: 
    
    ```
     PORT = 3000
    ```

    - go inside the `src` folder and execute the following command :

    ```
    npx sequelize init
    ```
    
    - By executing the above command you will get migration and seeder folder along with a config.json inside the config folder.

       - if you are setting up youe development enviroment , then write the username of your db , password of your db and in dialect mention whatever db you are using (mysql, postgres etc)

    - if you are setting up test or production enviroment , make sure you also replace the database name with your actual database name.

    - To run the server  execute the following command in your terminal :

    ```
    npm run dev
    ```
