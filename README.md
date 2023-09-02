# LightBnB

LightBnB is a vacation rental management system that allows property owners to list their properties for rent and users to browse and book accommodations. This single-page application is built using technologies like HTML, CSS, JavaScript (jQuery).

## Getting Started

- Clone this repo: git clone `git@github.com/shovon231/LightBnB`.
- This app uses PostgreSQL - please refer to [PostgreSQL Setup](###PostgreSQL-Setup).
- Open the application directory: `cd /LightBnB_WebApp`.
- Ensure that you are using node version 16 or later: `node -v`.
- Install the dependencies: `npm install`.
- Copy the .env file `cp .env.example .env`
- If you are using your own PostgreSQL credentials, update the `DB_USER` and `DB_PASS` fields in .env accordingly.
- Run the application: `npm run local`.
- Access the application in your browser at `localhost:[PORT]`. The default port is `3000`.

## PostgreSQL Setup

- You will require PostgreSQL to use this application; please ensure that it is installed. If not, you can download PostgreSQL [here](https://www.postgresql.org/about/).
- Start PostgreSQL: `psql` - please note that if you are on WSL, you will need to use the following command first: `startposgresql`.
- Run the following commands to create the necessary objects:
  CREATE ROLE labber WITH LOGIN password 'labber';
  CREATE DATABASE lightbnb OWNER labber;.
- Connect to the database: `\c lightbnb`.
- Run the schema in migrations `\i /migrations/01_schema.sql`.
- Seed the schema with dummy days `\i /seeds/01_seeds.sql`, `\i /seeds/02_seeds.sql`.
- Exit out of the PSQL `\q`.

## Features

### The project consists of the following main components:

Database (db): This directory contains the code for database interactions. The json directory stores dummy data in JSON files. The database.js file manages all queries to the database. It currently uses dummy data, but it can be extended to connect to a real database.

Client-Side Code (public): The public directory holds all client-side files like HTML, CSS, and JavaScript (jQuery). The index.html serves as the entry point for the single-page application. The javascript folder contains various components and scripts.

index.js starts up the application by rendering property listings.
network.js handles AJAX requests to the server.
views_manager.js controls the appearance of different components on the screen.
The components directory contains individual HTML components built using jQuery.
Routes (routes): This directory contains the router files that handle HTTP requests to /users/something or /api/something. The apiRoutes.js and userRoutes.js files handle API and user-related requests, respectively.

Styles (styles): The styles directory contains all Sass files for styling the application. It includes various \_\*.scss partials for different components and a main.scss file that imports them.

Server-Side (server.js): The server.js file is the entry point for the application. It connects the routes to the database, allowing the application to handle client requests and provide appropriate responses.

## Environment

- Node v16 or higher

## Dependencies

- bcrypt 3.0.6 or above
- cookie-session 1.3.3 or above
- express 4.17.1 or above
- nodemon 1.19.1 or above
- pg 8.10.0 or above

## Interface Images

The following screenshots show various parts of the app interface. While the design is basic (for now!) we are confident that you will be able to customize our template into your dream home-rental website!

Home Page

![Home page](.LightBnB_WebApp/docs/home.png)

After User Logged in

![Search page](./docs/afterlogin.png)

Search Results

![Search results](./docs/Search.png)

Add New Property

![Add new property](./docs/propertylisting.png)

## Project Structure

```
.
├── db
│   ├── json
│   └── database.js
├── public
│   ├── javascript
│   │   ├── components
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── libraries
│   │   ├── index.js
│   │   ├── network.js
│   │   └── views_manager.js
│   ├── styles
│   │   ├── main.css
│   │   └── main.css.map
│   └── index.html
├── routes
│   ├── apiRoutes.js
│   └── userRoutes.js
├── styles
│   ├── _forms.scss
│   ├── _header.scss
│   ├── _property-listings.scss
│   └── main.scss
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

## Contributing

Contributions to LightBnB are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request. Please follow the project's coding standards and guidelines.

When contributing, make sure to:

Fork the repository.
Create a new branch for your feature or bug fix.
Commit your changes with clear commit messages.
Push your changes to your forked repository.
Submit a pull request to the main branch of the original repository.

## License

The LightBnB project is open-source and released under the MIT License.
