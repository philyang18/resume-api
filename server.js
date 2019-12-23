const express = require('express');
const cors = require('cors');
const server = express();


const { ENVIRONMENT, PORT } = process.env;
// middleware
server.use(express.json());
server.use(cors({
    origin: ENVIRONMENT === 'development' ? 'http://localhost:3000' : 'https://nasa-images.surge.sh'
    // origin: 'http://localhost:3000'
}));

const db = {
    projects: {
        web_development: [
            {
                id: 1,
                title: "Movies 4 You",
                thumbnail: "./images/movies.png",
                url: "http://303.itpwebdev.com/~yangphil/assignment5/movie.HTML",
                languages: "HTML, CSS, JavaScript",
                frameworks: "Bootstrap",
                type: "Frontend",
                description: "This website was a course assignment that challenged me when I began web development. The purpose of the site is to make an AJAX call to an API created by TheMovieDB then use JavaScript to create HTML elements with the information from the API."
            },
            {
                id: 2,
                title: "DVD Database",
                thumbnail: "./images/dvd.jpg",
                url: "http://303.itpwebdev.com/~yangphil/assignment10/index.PHP",
                languages: "HTML, CSS, PHP",
                frameworks: "Bootstrap",
                type: "Frontend",
                description: "hello"
            },
            {
                id: 3,
                title: "Memeversity",
                thumbnail: "./images/meme.png",
                url: "http://303.itpwebdev.com/~yangphil/final_project/login.PHP",
                languages: "HTML, CSS, JavaScript, PHP",
                frameworks: "Bootstrap",
                type: "Full Stack",
                description: "This project is my first full stack application. The idea was to create a web app that allows users to search through popular meme templates so that they can create and save their own memes. Currently, the website retrieves the templates from a free meme API and stores the template urls onto my database. Since the API generates a different set of templates every few weeks, I 'refresh' my database with the new set of memes everytime a user logs in. I also implemented a button at the bottom of the home page so that the user can manually execute this process. Users can also 'favorite' the templates so that it is saved in my database before it is removed from the API.\nAll database communication is executed by making sql statements in PHP. The 'forgot password' is functional however it does not use a foolproof method because it simply emails the user their password instead of linking them to a page where they can change their password safely. Please note that I have not implemented the create functionality or the FaceBook login."
            },
            {
                id: 4,
                title: "NASA Images",
                thumbnail: "./images/nasa.jpg",
                url: "https://nasa-images.surge.sh",
                languages: "HTML, CSS, JavaScript",
                frameworks: "Bootstrap, react",
                description: "NASA Images is a single page application that uses NASA's Astronomy Photo of the Day and Mars Rover APIs. The site uses a server-side API to store the users favorites. Since I do not use a database, all activity is synced to my API so everyone sees the changes caused by others."
            },
            {
                id: 5,
                title: "this",
                thumbnail: "./images/pin.jpg",
                url: "",
                languages: "HTML, CSS, JavaScript",
                frameworks: "Bootstrap, react",
                description: "This website uses a server-side API to access all my project information. I decided to use an API instead of hardcoding all my projects because I wanted to reduce the amount of code and make it super easy for me to add new projects. Since the components I am using are reusable, I just have to edit the api and I do not have to rebuild my react project and redeploy. The api is live so when the api is edited, this site will change."
            }
        ],
        programming: [
            {
                id: 1,
                title: "Sieve of Erastosthenes",
                thumbnail: "./images/github.png",
                video_url: "",
                languages: "C++",
                description: ""
            },
            {
                id: 2,
                title: "",
                thumbnail: "./images/github.png",
                video_url: "",
                languages: "C++",
                description: ""
            },
            {
                id: 3,
                title: "",
                thumbnail: "./images/github.png",
                video_url: "",
                languages: "C++",
                description: ""
            },
            {
                id: 4,
                title: "",
                thumbnail: "./images/github.png",
                video_url: "",
                languages: "C++",
                description: ""
            },
            {
                id: 5,
                title: "",
                thumbnail: "./images/github.png",
                video_url: "",
                languages: "C++",
                description: ""
            }
        ],
        microcontrollers: [
            {
                id: 1,
                title: "Arduino Monitoring System",
                thumbnail: "./images/arduino.jpeg",
                video_url: "",
                interface_url: "https://nuhzdinlab.onlosant.com/kelp",
                description: "In the fall semester of 2019, I worked on a fully-funded project for the Nuzhdin Lab at USC with three other students. The goal of this project was to build an automated system of water tanks to store kelp samples in ideal ocean conditions for biofuel research. My primary role was programming the sensors with an Arduino Uno, and broadcasting the data onto the internet through an IoT platform called Losant so that the lab can observe tank conditions at all times. However, the Arduino we purchased did not have wifi capabilities and I did not want to spend more money on a wifi shield so I used a software called 'Cool Term' to continuously save Arduino data onto a text file. Then I wrote a script in Java which reads in lastest line from the file and sends a POST request to a Losant webhook. From Losant's app, I was able to access that line of data and break it into its separate components so that I can display the data nicely on an interface. One amazing feature is that Losant will send a text message to the head of the lab if any of the tank conditions are abnormal."
            }
        ] 
    }
}

server.get("/api/projects", (request, response) => {
    console.log(PORT);
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
    const id = Number(request.params.id);
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
    const id = Number(request.params.id);
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
    const id = Number(request.params.id);
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