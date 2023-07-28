# LightBnB

LightBnB is a vacation rental management system that allows property owners to list their properties for rent and users to browse and book accommodations. This single-page application is built using technologies like HTML, CSS, JavaScript (jQuery), and follows the Model-View-Controller (MVC) design pattern for a clean and organized codebase.

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

## The project consists of the following main components:

Database (db): This directory contains the code for database interactions. The json directory stores dummy data in JSON files. The database.js file manages all queries to the database. It currently uses dummy data, but it can be extended to connect to a real database.

Client-Side Code (public): The public directory holds all client-side files like HTML, CSS, and JavaScript (jQuery). The index.html serves as the entry point for the single-page application. The javascript folder contains various components and scripts.

index.js starts up the application by rendering property listings.
network.js handles AJAX requests to the server.
views_manager.js controls the appearance of different components on the screen.
The components directory contains individual HTML components built using jQuery.
Routes (routes): This directory contains the router files that handle HTTP requests to /users/something or /api/something. The apiRoutes.js and userRoutes.js files handle API and user-related requests, respectively.

Styles (styles): The styles directory contains all Sass files for styling the application. It includes various \_\*.scss partials for different components and a main.scss file that imports them.

Server-Side (server.js): The server.js file is the entry point for the application. It connects the routes to the database, allowing the application to handle client requests and provide appropriate responses.

## Getting Started

To run the LightBnB application locally, follow these steps:

## Clone the repository:

git clone https://github.com/your-username/LightBnB.git
->cd LightBnB
->npm install
->After setting up the project, start the development server with the following command:
->npm start

Access the application in your web browser at http://localhost:3000. The application allows you to browse properties, search for specific properties, manage your properties (if you are an owner), and make bookings.

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
