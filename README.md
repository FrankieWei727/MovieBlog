# MovieBlog
This is a Django project which developed with django-restful-framework and it also implemented React as the front end service.

## Implement Guide
run requirements   

    pip install -r requirements.txt


run redis service

    cd redis-4.0.2 
    make
    src/redis-server
    
Note: For the first time running the redis server, please run make in Terminal.

install webpack 
    
    npm i -D webpack webpack-cli

solr-4.10.4  
pip3 install django-haystack-2.6.1  
pip3 install pysolr-3.6.0  
pip3 install haystack-0.42   
Indexing data:  


python manage.py rebuild_index  

Start solr service:  
java -jar start.jar  

Tips:  

When you run this project, you need:  
     1. always run solr service  
     2. always run Redis service  


