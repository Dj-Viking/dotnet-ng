# Development

- This project was created to be ran inside vscode, the most optimal way to run this is within the debugger.
- This is a c# backend with angular 13 frontend SPA full-stack application.
- There is a lot of configuration behind this. I find that it works best by hitting the green play button inside the debugger tab, all the scripts necessary will run. The front end has a proxy redirect whenever the page is refereshed the development server intercepts these GET requests that are made during client side routing to just keep serving the html of the front end SPA. 
- Sorry in advance for anybody using visual studio :( I hope this is a straightforward explanation
- Any troubleshooting of the API can be done via Postman or Insomnia via https, if you rather not try to navigate the client to find where the endpoint request is made.
- All requests are made with a development certificate via `https://localhost:44456/` currently. 
