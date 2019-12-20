const express = require('express');
const cors = require('cors');
const server = express();


const { ENVIRONMENT, PORT } = process.env;
const IS_DEVELOPMENT = ENVIRONMENT === 'development';
// middleware
server.use(express.json());
server.use(cors({
  origin: IS_DEVELOPMENT ? 'localhost:3000' : 'https://nasa-images.surge.sh'
}));

const db = {
    projects: {
        web_development: [
            {
                id: 1,
                url: "http://303.itpwebdev.com/~yangphil/assignment5/movie.html",
                languages: "html, css, javascript",
                frameworks: "bootstrap",
                type: "Frontend",
                description: "This website was a course assignment that challenged me when I began web development. The purpose of the site is to make an AJAX call to an API created by TheMovieDB then use javascript to create HTML elements with the information from the API."
            },
            {
                id: 2,
                url: "http://303.itpwebdev.com/~yangphil/assignment10/index.php",
                languages: "html, css, php",
                frameworks: "bootstrap",
                type: "Frontend",
                description: "hello"
            },
            {
                id: 3,
                url: "http://303.itpwebdev.com/~yangphil/final_project/login.php",
                languages: "html, css, javascript, php",
                frameworks: "bootstrap",
                type: "Full Stack",
                description: "This project is my first full stack application. The idea was to create a web app that allows users to search through popular meme templates so that they can create and save their own memes. Currently, the website retrieves the templates from a free meme API and stores the template urls onto my database. Since the API generates a different set of templates every few weeks, I 'refresh' my database with the new set of memes everytime a user logs in. I also implemented a button at the bottom of the home page so that the user can manually execute this process. Users can also 'favorite' the templates so that it is saved in my database before it is removed from the API.\nAll database communication is executed by making sql statements in php. The 'forgot password' is functional however it does not use a foolproof method because it simply emails the user their password instead of linking them to a page where they can change their password safely. Please note that I have not implemented the create functionality or the FaceBook login."
            },
            {
                id: 4,
                url: "https://nasa-images.surge.sh",
                languages: "html, css, javascript",
                frameworks: "bootstrap, react",
                description: "hello"
            },
            {
                id: 5,
                url: "#",
                languages: "html, css, javascript",
                frameworks: "bootstrap, react",
                description: ""
            },
        ],
        programming: [
            {
                id: 1,
                video_url: "",
                languages: "C++",
                description: ""
            },
            {
                id: 2,
                video_url: "",
                languages: "C++",
                description: ""
            },
            {
                id: 3,
                video_url: "",
                languages: "C++",
                description: ""
            },
            {
                id: 4,
                video_url: "",
                languages: "C++",
                description: ""
            },
            {
                id: 5,
                video_url: "",
                languages: "C++",
                description: ""
            },
        ],
        microcontrollers: [
            {
                id: 1,
                video_url: "",
                interface_url: "",
                description: ""
            }
        ] 
    }
}

server.get("/api/projects", (request, response) => {
    response.json(db.projects);
});
server.get("/api/projects/web_development", (request, response) => {
    response.json(db.projects.web_development);
});
server.get("/api/projects/programming", (request, response) => {
    response.json(db.projects.programming);
});
server.get("/api/projects/microcontrollers", (request, response) => {
    response.json(db.projects.microcontrollers);
});


server.get("/api/projects/web_development/:id", (request, response) => {
    const id = request.params.id;
    const post = db.projects.web_development.find((post) => {
        return post.id === id;
    });
    if(post) {
        response.json(post);
    } else {
        response.status(404).send();
    }
});

server.get("/api/projects/programming/:id", (request, response) => {
    const id = request.params.id;
    const post = db.projects.programming.find((post) => {
        return post.id === id;
    });
    
    if(post) {
        response.json(post);
    } else {
        response.status(404).send();
    }
});
server.get("/api/projects/microcontrollers/:id", (request, response) => {
    const id = request.params.id;
    const post = db.projects.microcontrollers.find((post) => {
        return post.id === id;
    });
    
    if(post) {
        response.json(post);
    } else {
        response.status(404).send();
    }
});

server.listen(PORT || 8000);