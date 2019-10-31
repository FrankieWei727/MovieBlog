# MovieBlog


Install package:  
pip3 install social-auth-app-django  
pip3 install python-social-auth  
pip3 install Pillow==4.2.1  
pip3 install sorl-thumbnail-12.3  
pip3 install pytz  
pip3 install django-embed-video-1.1.2  
pip3 install Markdown2.6.9  

redis4.0.2  
http://redis.io/download download Redis  
input comment:  
cd redis-4.0.2  
make  
src/redis-server  

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


