# really
Sprint view for Rally.

## Local Setup
* `cd backend`
* Generate a Rally API key using [this CA guide](https://help.rallydev.com/rally-application-manager)
* `export RALLY_API_KEY = "<generated_rally_api_key>"`
* Generate a GitHub API key
* `export GITHUB_REMOTE = "https://github.snei.sony.com"`
* `export GITHUB_API_KEY = "<generated_github_api_key>"`
* `npm install`
* `cd ../frontend`
* `npm install`
* `npm run build`
* `cd ../backend`
* `npm start`
* Make a new terminal
* `cd ../frontend`
* `npm start`
* Verify all is well by opening `http://<host>:8081`

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
