# Share-and-know

Share and know is a website where people can create communities called hubs and make posts inside them to share all sorts of things with each other. Additionally, users have the
ability to create hubs inside other hubs.

## How it works

<details>
  <summary>How it works (Click to expand when you see the arrow!)</summary>
The / route is the homepage and it shows the 8 main hubs:

-   Technology
-   History
-   Math
-   Geography
-   Science
-   Art
-   Fun
-   Other stuff

### Hubs

Users can visit any of these hubs. When they visit a hub, they will see that there are no posts. That's because there are no posts in the main hubs. They can click a button
which will then show the hubs in that specific hub. They can then choose any hub to see or create a new one there if they are logged in. Logged in users can also join the
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

## Motivation and distinctiveness from other projects

### Motivation

I made share and know because students are always looking for resources of what they need to learn, and having it in one place would make this process easier.

### Distinctiveness

This project is different to each of the projects in the following ways:

-   Search: This project doesn't interact with google whatsoever
-   Wiki: Even though the project uses markdowm, users can choose where to put their posts or entries, can like them, make comments, choose ordering methods, and more. The only similarity is users can search for posts and that both use markdown to display entries.
-   Commerce: The project has nothing to do with online commerce and users can't upload images at all. The hubs of share and know are much more complex than the categories of commerce as well as the comments since they can be edited and load in batches of 5.
-   Mail: Even though this project is a single page app, it has custom routes, doesn't show only one type of thing(emails) and it doesn't serve the purpose of communication.
-   Network: The only similarity is users can see posts, like them, and visit a user's profile. However, users can't follow each other and users have to place posts in a specific place. Additionally, users can't edit posts but they can comment on them. Users can also choose how projects are ordered.
-   All: React was used for the frontend with js and on the backend I used the django-rest-framework. I also secured the hidden key in a separate .env file for security reasons. Finally, recursive routing was used so users can visit an unlimited depth of hubs, so not all routes are completely fixed.

## Files

There are 2 main directories where the code is, knowledge for the backend logic and frontend for the frontend of the app

### [Knowledge](./knowledge)

<details>
  <summary>Here is the backend logic + all the tests for the backend. The django-rest-framework was used to achieve the backend functionality</summary>

#### [models.py](./knowledge/models.py)

Here are the User, Post, Hub, and Comment models.

#### [serializers.py](./knowledge/serializers.py)

Here we have the following serializers:

-   ##### [LoginSerializer](./knowledge/serializers.py#L9)
-   ##### [RegisterSerializer](./knowledge/serializers.py#L37)
-   ##### [UserSerializer](./knowledge/serializers.py#L75)
-   ##### [HubPostSerializer](./knowledge/serializers.py#L85)
-   ##### [PostSerializer](./knowledge/serializers.py#L95)
-   ##### [CommentSerializer](./knowledge/serializers.py#L137)
-   ##### [HubSerializer](./knowledge/serializers.py#L155)

#### [views.py](./knowledge/views.py)

Here we have all the views where the backend recieves requests from the frontend and returns responses. We have the following views:

-   ##### [FrontendURL](./knowledge/views.py#L43)
-   ##### [FileView](./knowledge/views.py#L54)
-   ##### [Login](./knowledge/views.py#L64)
-   ##### [Register](./knowledge/views.py#L90)
-   ##### [HubItems](./knowledge/views.py#L110)
-   ##### [OneHub](./knowledge/views.py#L143)
-   ##### [NewHub](./knowledge/views.py#L167)
-   ##### [NewPost](./knowledge/views.py#L187)
-   ##### [OnePost](./knowledge/views.py#L215)
-   ##### [Comments](./knowledge/views.py#L244)
-   ##### [Joined](./knowledge/views.py#L279)
-   ##### [UserProfile](./knowledge/views.py#L303)
-   ##### [Users](./knowledge/views.py#L321)
-   ##### [Logout](./knowledge/views.py#L332)

We also have the following things here:

-   ##### [ItemPagination](./knowledge/views.py#L33)
-   ##### [get_hub_from_path](./knowledge/views.py#L342)

#### [urls.py](./knowledge/urls.py)

Here we have the url paths that allow the frontend to make requests to the backend by linking a path to each view

#### [tests](./knowledge/tests)

Here we have all the tests for the backend. We have the following files:

-   ##### \_\_init.py\_\_

Just allows us to use relative imports

-   ##### [test_comment.py](./knowledge/test_comment.py)

Tests for comments

-   ##### [test_hub.py](./knowledge/test_hub.py)

Tests for hubs

-   ##### [test_post.py](./knowledge/test_post.py)

Tests for posts

-   ##### [test_user.py](./knowledge/test_user.py)

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

-   #### [package.json](./frontend/package.json)

Specifies which packages we installed for anyone wanting to run the app

-   #### [yarn.lock](./frontend/yarn.lock)

A lockfile that locks our dependencies auto-generated by yarn.

-   #### [README.md](./frontend/README.md)

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

#### [components](./frontend/src/components)

<details>
  <summary>Here we have all the app components and a few extra things. In every directory there is an index.js file that exports every file inside it</summary>
  
  - ##### [Auth](./frontend/src/components/Auth)
  
   Here goes anything auth related. We have the following things:
   
   ###### [fetchCsrf.js](./frontend/src/components/Auth/fetchCsrf.js)
   Makes a fetch given a url, data, and method to use while passing the CSRF token gotten from the cookies
   
   ###### [LoggedInContext.js](./frontend/src/components/Auth/LoggedInContext.js)
   A React context for allowing the whole app know who is logged in. Exports a provider and a context. [More about React context](https://reactjs.org/docs/context.html)
   
   ###### [Login.js](./frontend/src/components/Auth/Login.js)
   Component which handles users logging in, fetches to the login view
   
   ###### [Register.js](./frontend/src/components/Auth/Register.js)
   Component that allows users to create an account, fetches to the Register view
   
   ###### [ToggleLoginContext.js](./frontend/src/components/Auth/ToggleLoginContext.js)
   React context for allowing components like Login and Register change who is logged in. Exports a provider and a context
   
  - ##### [Comment](./frontend/src/components/Comment)
  
   Here goes anything related to making and showing comments.
  
   ###### [Comment.js](./frontend/src/components/Comment/Comment.js)
   Component that shows a comment given commenter, content, date commented, and an id. It also allows users to edit the comment if the logged in user is the commenter, in which case when the commment is submitted it makes a fetch to the Comments view.
   
   ###### [List.js](./frontend/src/components/Comment/List.js)
   Component that shows a list of comments, animates them when appearing, and also splits them into "batches" of 5 so that more can be loaded on the press of the load more button.
   
   ###### [New,js](./frontend/src/components/Comment/New.js)
   Component that allows a user to make a new comment given the content, makes a fetch to the Comments view and if comment was created successfully, immediately adds it to the comments list.
   
  - ##### [General](./frontend/src/components/General)
  
   Here we have components and a hook used throughout the whole app
  
   ###### [Dropdown.js](./frontend/src/components/General/Dropdown.js)
   Animated dropdown component that recieves a list of options, selected option, and a setSortBy function to change which option is selected. Used to change post and hub sorting methods.
   
   ###### [Pagination.js](./frontend/src/components/General/Pagination.js)
   Component that recieves a currentPage, last page, and a setCurrentPage function and shows a group of pagination items being the first, current, and last one and a prev and next item. When each item is clicked, it sets the current page to the item's number.
   
   ###### [Search.js](./frontend/src/components/General/Search.js)
   Component that shows a search form and accepts an item type to search for, a setCurrentPage method to set the page back to 1 (explained why in component), and a setSearch method to change what was searched when the form submits.
   
   ###### [Sidebar.js](./frontend/src/components/General/Sidebar.js)
   Component that has a theme changing button from dark to light, a button to toggle (and animate on appearance) the sidebar content, a top bar with these 2 buttons, and a div to blur everything if the sidebar is shown.
   
   ###### [SidebarContent.js](./frontend/src/components/General/SidebarContent.js)
   The sidebar content that is shown from the sidebar, contains routes for Home and Users always and if the user is not logged in, Login and Register. If they are logged in, shows joined route and logout. The logout route is handled here too, makes a fetch to the Logout view and if everything is successful the user is logged out and sets the app's logged in user to null.
   
   ###### [usePrefersReducedMotion.js](./frontend/src/components/General/usePrefersReducedMotion.js) 
   React hook to see if the user prefers reduced motion from the prefers-reduced-motion media query. Used to make animations immediate. Returns true if they do prefer reduced motion, false otherwise.
   
  - ##### [Home](./frontend/src/components/Home)
  
   Everything related to showing the 8 main hubs in the homepage.
  
   ###### [Home.js](./frontend/src/components/Home/Home.js)
   The homepage itself, shows the 8 main hubs plus a welcome message.
   
   ###### [HomeRow.js](./frontend/src/components/Home/HomeRow.js)
   Shows a main hub row similar to a normal hub but with a box shadow and a different description and date.
   
  - ##### [Post](./frontend/src/components/Post)
  Here is everything related to posts
   
   ###### [GeneralPosts.js](./frontend/src/components/Post/GeneralPosts.js)
   Component that shows a paginated list of posts and allows users to sort by newest, oldest, most liked, and least liked. Makes a fetch to the HubItems view with a specific page, sorting method, and filter (user or joined).
   
   ###### [Joined.js](./frontend/src/components/Post/Joined.js)
   Component that shows posts from hubs a user has joined, user can choose from the 4 ordering methods of GeneralPosts.js
   
   ###### [Like.js](./frontend/src/components/Post/Liked.js)
   If the user is logged in, allows users to like or unlike a post, makes a fetch to OnePost.
   
   ###### [List.js](./frontend/src/components/Post/List.js)
   Shows a list of posts and animates them on appearance.
   
   ###### [New.js](./frontend/src/components/Post/New.js)
   Allows users to make a new post in a hub, makes a fetch to NewPost and if post was created successfully navigates to it.
   
   ###### [Post.js](./frontend/src/components/Post/Post.js)
   Shows a specific post with its poster, title, content, like amount and button, hubs, and all of its comments plus the ability to make a new one
   
   ###### [Row.js](./frontend/src/components/Post/Row.js)
   The post row shown in List.js, when clicked goes to its specific post.
   
  - ##### [Hub](./frontend/src/components/Hub)
  
   Here we have everything related to hubs.
  
   ###### [Hub.s](./frontend/src/components/Hub/Hub.js)
   Here is a main hub page. It shows the hub title and description, and also the posts/hubs of this hub which can be changed on the click of a button. Users can choose how the items (posts/hubs) are ordered, search for specific items and items are displayed in groups of 6 with pagination. Logged in users can also join the hub, make a new hub inside it and if the hub isn't a main hub users can make a new post as well.
   
   ###### [HubList.js](./frontend/src/components/Hub/HubList.js)
   Component that given a list of hubs, shows and animates them on appearing.
   
   ###### [HubPath.js](./frontend/src/components/Hub/HubPath.js)
   Component that shows the breadcrumb menu at the top of the screen when going through hubs. Sanitizes the path to only include hub names, removing stuff like new or posts/UUID and only showing the sanitized hubs
   
   ###### [New.js](./frontend/src/components/Hub/New.js)
   Component that handles users creating a new hub, makes a fetch to the NewHub view and if the hub was created successfully, navigates to its page.
   
   ###### [Row.js](./frontend/src/components/Hub/Row.js)
   Component that shows a HubRow, when clicked it navigates to the hub's page
   
   ###### [ToggleButton.js](./frontend/src/components/Hub/ToggleButton.js)
   The toggle button that allows us to change from one type to another in a Hub, animates with a color change.
   
  - ##### [User](./frontend/src/components/User)
  Component with eberything relaed to searching for users and a user profile
  
   ###### [List.js](./frontend/src/components/User/List.js)
   Shows a list of users and animates them, allows other users to search for specific users. Users only show up when something has been searched.
   
   ###### [Profile.js](./frontend/src/components/User/Profile.js)
   Shows a user profile, which is their username, profile pic, posts count, and joined hubs count. Shows all the user's posts as well and allows users to choose how they are ordered as always.
   
   ###### [Row.js](./frontend/src/components/User/Row.js)
   Shows a user row of the users list, when clicked navigates to the user's profile.
   
</details>
</details>

## Running and using

<details>
  <summary>Instructions on how to run the server</summary>
  
  Install packages and make migrations in the root directory:
  ```py
  pip3 install -r requirements.txt
  python3 manage.py makemigrations knowledge
  python3 manage.py makemigrations
  python3 manage.py migrate
  ```
  Then, go to the share folder, create a .env file and have its contents be the following
  ```
  SECRET_KEY=02963a29894ceaf3fd4d34afdd58927ab5244c58612cb5ca19
  ```
  now go back to the root directory and run `python3 manage.py runserver` to see the app live!
</details>
