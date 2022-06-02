# Project Name

EYES ON YOU
<br>

# Quick Compo

<br>

## Description

This is an app to connect scouter with the people who want oportunity

## User Stories

- **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist.
- **Signup:** As an anonymous user I can sign up as player or scouter on the platform so that I can enjoy the experience of the app .
- **Login:** As a user I can login to the platform so that I can access my profile,feed,list of friends, chat with ours friends,recive the notification, list of events as a player and create a event as a scouter.
- **Logout:** As a logged in user I can logout from the platform so no one else can use it.
- **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see the list of post I have created.
- **Add event:** As a logged in user as a scouter I can access the add event page so that I can create a new event.
- **Add Post:** As a user I can add posts to my profile.
- **Chat:** As a user i can chat with other users.
- **Notifications:** As a user I can see the notifications of my friends.

## Backlog

-
-
-
-

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                         | Component            | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.           |
| `/signup`                    | SignupPage           | anon only `<AnonRoute>`    | Signup form, navigates to home page after signup.         |
| `/`                          | HomePage             | public `<Route>`           | Home page.                                                |
| `/user-profile`              | ProfilePage          | user only `<PrivateRoute>` | User and player profile for the current user.             |
| `/user-profile/edit`         | EditProfilePage      | user only `<PrivateRoute>` | Edit user profile form.                                   |
| `/search`| SearchPage | user only `<PrivateRoute>` | Create new tournament form.                               |
| `/Feed`               |   FeedPage | user only `<PrivateRoute>` | Tournaments list.                                         |
| `/event/create` | EventPage | user only `<PrivateRoute>` |. Shows players list and other details. |
| `/event/:id`    | EventDetailsPage    | user only `<PrivateRoute>` | Single player details.                                    |
| `/post/:id`    | PostDetailsPage        | user only `<PrivateRoute>` | Tournament rankings list.                                 |
 `/post/create` | PostPage | user only `<PrivateRoute>` |. Shows players list and other details. |
## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- EditProfilePage

- CreateEventsPage

- FeedPage

- NotificationPage

- ChatPage

- SearchPage

Components:

- Post
- Comments
- Button
- Navbar
- playerCard
- searchBar

## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

<br>

# Server / Backend

## Models

**User model**

```javascript
{
  email: { type: String, required: true, unique: true },
  imageUrl:{
    type:String,
  },
  password: { type: String, required: true },
comments: [ { type: Schema.Types.ObjectId, ref:'Comment' } ],
   types: ['Player','Scouter'],
   Posts: [ { type: Schema.Types.ObjectId, ref:'Post' } ],
    Events: [ { type: Schema.Types.ObjectId, ref:'Events' } ],
    sport:{
      type:String,
    },
    team:{
      type:String,
    }
friends:[{type: Schema.Types.ObjectId, ref:'User'}]
}
```

**Post model**

```javascript
 {
   imageUrl{
     type:String,
   },
   
   title:{type:String},
   description:{type:String},
   Usercomments: [ { type: Schema.Types.ObjectId, ref:'Comments' } ],
   author:  { type: Schema.Types.ObjectId, ref:'User' } ,
 }
```

**Comments model**

```javascript
{
  Author:{ type: Schema.Types.ObjectId, ref:'User' },
  text:{type:String},
}
```

**Events model**

```javascript
{
  imageUrl:{
    type:String,
  },
  Author: { type: Schema.Types.ObjectId, ref:'User' },
  description:{
    type:String,
  },
  join:[ { type: Schema.Types.ObjectId, ref:'User' } ]


}
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                                                                                     |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | `/auth/profile `       | Saved session                | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/auth/signup`         | {name, email, password,imageUrl,types}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `/api/post`     |                              |                | 400          | Show all posts                                                                                                            |
| GET         | `/api/post/:id` |                              |                |              | Show specific post                                                                                                       |
| POST        | `/api/post/create`     | { post model  }       | 201            | 400          | Create and save a new post                                                                                               |
                                                                            
| DELETE      | `/api/post/:id` |                              | 201            | 400          | delete post                                                                                                              |
| GET         | `/api/event/:id`     |                              |                |              | show event                                                                                       |
| POST        | `/api/event`         | { event model }  | 200            | 404          | add event                                                                                                                 |
| PUT         | `/api/user/:id`     | { user model }                | 201            | 400          | edit user                                                                                                                   |
| DELETE      | `/api/user/:id`     |                              | 200            | 400          | delete user                                                                                                              |
| GET         | `/api/games`           |                              | 201            | 400          | show games                                                                                                                      |
| GET         | `/api/games/:id`       |                              |                |              | show specific game                                                                                                              |
| POST        | `/api/games`           | {player1,player2,winner,img} |                |              | add game                                                                                                                        |
| PUT         | `/api/games/:id`       | {winner,score}               |                |              | edit game                                                                                                                       |

<br>

## API's

<br>

## Packages

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/PBqtkUFX/curasan) or a picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com) - The url to your _public_ presentation slides

### Contributors

FirstName LastName - <github-username> - <linkedin-profile-link>

FirstName LastName - <github-username> - <linkedin-profile-link>
