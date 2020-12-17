# Shortster-by-MovingWorlds Documentation
Test application For shortening links
# To run the application you need:
- Install and run mongodb server.
    - [mongodb.com](https://www.mongodb.com/try/download/community)
- Add a link to connect to enviroments.
    - Example: mongodb://localhost:27017/Shortster
- Launch the application.
    - npm i || npm install
    - npm start || node index || node index.js
        
# Description of requests:      
  
| Method | Url | Description|
|----:|:----:|:----------|
| GET[] | / | Home page |
| POST[longUrl,shortcode] | /generate | Accepts two arguments and generates a shortcut link |
| GET[shortcode] | /:shortcode | Accepts one argument and serves to go to the address using the shortened link |
| GET[shortcode] | /:shortcode/stats | Accepts one argument and serves to display statistics for a shortcut link |    
