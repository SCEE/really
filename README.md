# really
Sprint view for Rally.

## Local Setup
* Generate a Rally API key using [this CA guide](https://help.rallydev.com/rally-application-manager)
* Change into the project base directory
* Run `npm install` to download NodeJS dependencies for the backend
* `cd frontend`
* Run `npm install` to download NodeJS dependencies for the frontend
* Run `npm run build` to download client-side JavaScript libraries
* `cd ..`
* `export RALLY_API_KEY = "<generated_rally_api_key>"`
* Start backend server with `npm start`
* `cd frontend`
* Start frontend server with `npm start`
* Verify all is well by opening `http://<host>:8081` in the browser

## UAT Setup

    # basics
    # clone the repo to /opt/really
    cd /opt/really;
    sudo npm install forever -g;
    
    # backend
    npm install;
    export RALLY_API_KEY="<generated_rally_api_key>";
    forever start index.js;
    
    #frontend
    cd frontend;
    npm install;
    forever start node_modules/http-server/bin/http-server -p 8081 --cors;
    cd -;
    
    #observe
    forever list;
