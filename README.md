# Share-and-know

Share and know is a website where people can create communities called hubs and make posts inside them to share all sorts of things with each other. Additionally, users have the
ability to create hubs inside other hubs.

## How it works

The / route is the homepage and it shows the 8 main hubs:

- Technology
- History
- Math
- Geography
- Science
- Art
- Fun
- Other stuff

### Hubs
Users can visit any of these hubs. When they visit a hub, they will see that there are no posts. That's because there are no posts in the main hubs. They can click a button 
which  will then show the hubs in that specific hub. They can then choose any hub to see or create a new one there if they are logged in. Logged in users can also join the 
hubs. When seeing another hub, logged in users can join it, make new posts and a new hub. All users can see its hubs and posts. 

### Posts
Now, when visiting a post, users will see the title, content, who made it (which will link to their profile) and logged in users can also comment and like/unlike the post. 
Comments are shown in batches of 5 and users can load more if there are. 

### User profiles
Users have a profile which can be accessed from a comment or post they made and they can also be found by searching in the users tab of the navbar. Additionally, logged in users
can also see posts from hubs they have joined.

### Other
Whenever posts and hubs are shown, users can choose from a set of ordering options. When visiting hubs, a breadcrumb menu will show at the top listing the hubs they are in 
currently.

## Files 

There are 2 main directories where the code is, knowledge for the backend logic and frontend for the frontend of the app

### [Knowledge](./knowledge)
Here is the backend logic + all the tests for the backend. The django-rest-framework was used to achieve the backend functionality

#### [models.py](./knowledge/models.py)
Here are the User, Post, Hub, and Comment models. 

#### [serializers.py](./knowledge/serializers.py)
Here we have the following serializers:

- ##### [LoginSerializer](./knowledge/serializers.py#L9)
- ##### [RegisterSerializer](./knowledge/serializers.py#L37)
- ##### [UserSerializer](./knowledge/serializers.py#L75)
- ##### [HubPostSerializer](./knowledge/serializers.py#L85)
- ##### [PostSerializer](./knowledge/serializers.py#L95)
- ##### [CommentSerializer](./knowledge/serializers.py#L137)
- ##### [HubSerializer](./knowledge/serializers.py#L155)

#### [views.py](./knowledge/views.py)
