# Login
##### $ heroku login


# Create a Heroku app
##### $ heroku create

# Disable Cache
##### $ heroku config:set NODE_MODULES_CACHE=false
##### $ git commit -am 'disable node_modulles cache' --allow-empty
##### $ git push heroku master

# Deploy your code
##### $ git add .
##### $ git commit -m "Text"
##### $ git push heroku master

# Add a Heroku app as a Git remote
##### $ heroku git:remote -a <app name>

# Visit the app
##### $ heroku open

# Ensure that at least one instance of the app is running
##### $ heroku ps:scale web=1

# View Logs
##### $ heroku logs --tail

# Define a Procfile
##### $ web: node index.js

# Check how many dynos running
##### $ heroku ps

# Scale an application using dynos
##### $ heroku ps:scale web=0 // no dynos
##### $ heroku ps:scale web=1 // one dyno

# Run the app locally
##### $ heroku local web

# Add-ons
##### $ heroku addons:create <add-ons>

# List add-ons
##### $ heroku addons

# Add Config vars
##### $ heroku config:set TOKEN=xyz

# View the config vars
##### $ heroku config
