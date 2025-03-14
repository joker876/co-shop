# Co-shop
Create shopping lists in real-time collaboration with your other housemates!

## Running the app
First, install all required packages in three separate folders. It can be automated by just running the script `npm run install-all`.

Next, run the ip generator script (`npm run ip-generator`).
It takes your IP Address and plugs it in to some configuration files, allowing for connection to the server from any device within the local network (phone, tablet, etc.).
Just open the frontend on the phone, and it will work!
Do not worry, both files where the IP is plugged into are git-ignored.

Lastly, in two terminals, run both `npm run front` and `npm run server`. They start both the frontend and the backend in watch mode, so they automatically restart on changes.

## Other scripts
- `npm run prettier` - formats the entire codebase with prettier.
- `npm run build` - builds the frontend app.
