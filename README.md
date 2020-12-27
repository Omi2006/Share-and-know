# Share-and-know

Share and know is a website where people can create communities called hubs and make posts inside them to share all sorts of things with each other. Additionally, users have the
ability to create hubs inside other hubs.

## How it works
<details>
  <summary>How it works (Click to expand when you see the arrow!)</summary>
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
</details>

## Files

There are 2 main directories where the code is, knowledge for the backend logic and frontend for the frontend of the app

### [Knowledge](./knowledge)
<details>
  <summary>Here is the backend logic + all the tests for the backend. The django-rest-framework was used to achieve the backend functionality</summary>

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
Here we have all the views where the backend recieves requests from the frontend and returns responses. We have the following views:

- ##### [FrontendURL](./knowledge/views.py#L43)
- ##### [FileView](./knowledge/views.py#L54)
- ##### [Login](./knowledge/views.py#L64)
- ##### [Register](./knowledge/views.py#L90)
- ##### [HubItems](./knowledge/views.py#L110)
- ##### [OneHub](./knowledge/views.py#L143)
- ##### [NewHub](./knowledge/views.py#L167)
- ##### [NewPost](./knowledge/views.py#L187)
- ##### [OnePost](./knowledge/views.py#L215)
- ##### [Comments](./knowledge/views.py#L244)
- ##### [Joined](./knowledge/views.py#L279)
- ##### [UserProfile](./knowledge/views.py#L303)
- ##### [Users](./knowledge/views.py#L321)
- ##### [Logout](./knowledge/views.py#L332)

We also have the following things here:
- ##### [ItemPagination](./knowledge/views.py#L33)
- ##### [get_hub_from_path](./knowledge/views.py#L342)

#### [urls.py](./knowledge/urls.py)
Here we have the url paths that allow the frontend to make requests to the backend by linking a path to each view

#### [tests](./knowledge/tests)
Here we have all the tests for the backend. We have the following files:

- ##### \_\_init.py__

 Just allows us to use relative imports
 
- ##### [test_comment.py](./knowledge/test_comment.py)

 Tests for comments
 
- ##### [test_hub.py](./knowledge/test_hub.py)

 Tests for hubs

- ##### [test_post.py](./knowledge/test_post.py)

 Tests for posts

- ##### [test_user.py](./knowledge/test_user.py)

 Tests for users

#### [admin.py](./knowledge/admin.py)

 Here we register the models for the admin page
 
#### [settings.py (in the share directory)](./share/settings.py)

 Here are the main app settings 
 
#### [urls.py (in the share directory)](./share/urls.py)

 Here we add the knowledge urls to the rest of the app and also have a catch-all view to render the frontend so it can handle the routing
 
</details>

### [Frontend](./frontend)

<details>
  <summary>Here we have the frontend code made with react, react-router for routing, react-hook-form for forms, react-autosize-textarea for the textareas, react-hot-toast for 
    the pop-up notifications, react-identicons for the user profile pictures, react-markdown for securely turning markdown to html, react-spring for animations, and reactstrap
    for bootstrap integration.</summary>
  
  The directory structure for frontend is as follows:
  - #### [public](./frontend/public)
  
   Here we have the index.html file the react app will render on, a site.webmanifest file that allows the app to be a Progressive web app, and some icons for the app to also     make it a progressive web app. We also have a browserConfig.xml file for the Windows tile things and a robots.txt to tell the app which bots to not allow.
  
  - #### [build](./frontend/build)
  
   Here we have all the files of the public directory and an asset-manifest.json file that tells the browser where to find the files, a precache-manifest.json file which helps cache the site.webmanifest file, a service-worker.js we don't use, and a static directory. In the static directory we have the optimized version of the app so that when the server renders the build index.html, it's as fast as possible.

- #### [package.json](./frontend/package.json)

 Specifies which packages we installed for anyone wanting to run the app
 
- #### [yarn.lock](./frontend/yarn.lock)

 A lockfile that locks our dependencies auto-generated by yarn.
 
- #### [README.md](./frontend/README.md)
 
 Has a set of commands for how to run the app, auto-generated by create-react-app.
 
#### [src](./frontend/src)
Here is where all the frontend code lives. We have the following structure:

##### [App.js](./frontend/src/App.js)
Here is where all the code comes together and where we define all the App routes.

##### [App.css](./frontend/src/App.css)
Here we have the styles for when running the frontend app in debug mode.

##### [index.js](./frontend/src/index.js)
Is what renders the app into the index.hmtl file

##### [index.css](./frontend/src/index.css)
Here we have the global styles for the whole app

##### [serviceWorker.js](./frontend/src/serviceWorker.js)
What allows us to run the app in debug mode

##### [setUpTests.js](./frontend/src/setUpTests.js)
Something run before every test in the app

###### [images](./frontend/src/images)

Contains the images used in the app, from [undraw.co/illustrations](https://undraw.co/illustrations). There we have the login image and the share_online one (used in register)

#### [style](./frontend/src/style)
<details>
  <summary>Contains the css files for individual parts of the app</summary>
  
  - ##### [auth.css](./frontend/src/style/auth.css)
   
   Contains the styles for anything auth related (Login and Register)
   
  - ##### [dropdown.css](./frontend/src/style/dropdown.css)
   
   Contains the style for the animated dropdown component
   
  - ##### [hub.css](./frontend/src/style/hub.css)
  
   Contains the style for anything hub related (in the Hub directory of components)
  
  - ##### [navbar.css](./frontend/src/style/navbar.css)
  
   Contains the styles for anyhing related to the animated sidebar 
   
  - ##### [post.css](./frontend/src/style/post.css)
  
   Contains the style for anything related to posts
   
  - ##### [user.css](./frontend/src/style/user.css)
  
   Contains the style for anything related to a user's profile and user lists

</details>

##### [components](./frontend/src/components)

<details>
  <summary>Here we have all the app components and a few extra things. In every directory there is an index.js file that exports every file inside it</summary>
  
  - ##### [Auth](./frontend/src/components/Auth)
  Here goes anything auth related. We have the following things:
   
   ###### [fetchCsrf.js](./frontend/src/components/Auth/fetchCsrf.js)
   Makes a fetch given a url, data, and method to use while passing the CSRF token gotten from the cookies
   
   ###### [LoggedInContext.js](./frontend/src/components/Auth/LoggedInContext.js)
   A React context for allowing the whole app know who is logged in. Exports a provider and a context. [More abput React cpntext](https://reactjs.org/docs/context.html)
   
   ###### [Login.js](./frontend/src/components/Auth/Login.js)
   Component which handles users logging in.
   
</details>
</details>
