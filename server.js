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
                title: "Memeversity",
                thumbnail: "./images/meme.png",
                github_url: "https://github.com/philyang18/memeversity",
                languages: "HTML, CSS, JavaScript, PHP",
                video_url: "",
                description: "This project is my first full stack application. The idea was to create a web app that allows users to search through popular meme templates so that they can create and save their own memes. Currently, the website retrieves the templates from a free meme API and stores the template urls onto my database. Since the API generates a different set of templates every few weeks, I 'refresh' my database with the new set of memes everytime a user logs in. I also implemented a button at the bottom of the home page so that the user can manually execute this process. Users can also 'favorite' the templates so that it is saved in my database before it is removed from the API. All database communication is executed by making SQL statements in PHP. The 'forgot password' is functional however it does not use a foolproof method because it simply emails the user their password instead of linking them to a page where they can change their password safely. Please note that I have not implemented the create functionality or the FaceBook login.",
                url: "http://303.itpwebdev.com/~yangphil/final_project/login.PHP",
                frameworks: "Bootstrap",
                type: "Full Stack"
            },
            {
                id: 2,
                title: "NASA Images",
                thumbnail: "./images/nasa.jpg",
                github_url: "https://github.com/philyang18/Nasa-Images",
                languages: "HTML, CSS, JavaScript",
                video_url: "",
                description: "NASA Images is a single page application built in React that displays images from two NASA APIs. The site currently uses an in-memory API to store the user's favorite images because I have yet to implement a backend.",
                url: "https://nasa-images.surge.sh",
                frameworks: "Bootstrap, React",
                type: "Front End"
            },
            {
                id: 3,
                title: "this",
                thumbnail: "./images/pin.jpg",
                github_url: "https://github.com/philyang18/resume",
                languages: "HTML, CSS, JavaScript",
                video_url: "",
                description: "This website was built in React, deployed with Surge, and sends GET requests to an API to retrieve my project information.",
                url: "",
                frameworks: "Bootstrap, React",
                type: "Front End"
            }
        ],
        programming: [
            {
                id: 1,
                title: "Sieve of Erastosthenes",
                thumbnail: "./images/github.png",
                github_url: "",
                languages: "C++",
                video_url: "",
                description: "",
                frameworks: ""
            },
            {
                id: 2,
                title: "Lights Out Game",
                thumbnail: "./images/lights.jpg",
                github_url: "https://github.com/philyang18/Java-Lights-Out-Game",
                languages: "Java",
                video_url: "https://www.youtube.com/embed/NmTOJV1b3xk",
                description: "Lights Out is a jump scare game. The emphasis of this project was creating an appealing GUI and using the MVC design pattern.",
                frameworks: "JavaFX"
            },
            {
                id: 3,
                title: "Towers of Hanoi",
                thumbnail: "./images/github.png",
                github_url: "",
                languages: "C++",
                video_url: "",
                description: ""
            },
            {
                id: 4,
                title: "Sieve of Erastosthenes",
                thumbnail: "./images/github.png",
                github_url: "",
                languages: "C++",
                video_url: "",
                description: ""
            },
            {
                id: 5,
                title: "Sieve of Erastosthenes",
                thumbnail: "./images/github.png",
                github_url: "",
                languages: "C++",
                video_url: "",
                description: ""
            }
        ],
        microcontrollers: [
            {
                id: 1,
                title: "Arduino Monitoring System",
                thumbnail: "./images/arduino.jpeg",
                github_url: "",
                languages: "C++, Java",
                video_url: "https://www.youtube.com/watch?v=NmTOJV1b3xk&feature=youtu.be",
                description: "In the fall semester of 2019, I worked on a fully-funded project for the Nuzhdin Lab at USC with three other students. The goal of this project was to build an automated system of water tanks to store kelp samples in ideal ocean conditions for biofuel research. My primary role was programming the sensors with an Arduino Uno, and broadcasting the data onto the internet through an IoT platform called Losant so that the lab can observe tank conditions at all times. However, the Arduino we purchased did not have wifi capabilities and I did not want to spend more money on a wifi shield so I used a software called 'Cool Term' to continuously save Arduino data onto a text file. Then I wrote a script in Java which reads in lastest line from the file and sends a POST request to a Losant webhook. From Losant's app, I was able to access that line of data and break it into its separate components so that I can display the data on an interface. One amazing feature is that Losant will send a text message to the head of the lab if any of the tank conditions are abnormal.",
                url: "https://nuhzdinlab.onlosant.com/kelp",
                technologies: "Arduino, Cool Term, Losant"
            },
            {
                id: 2,
                title: "Bluetooth Car",
                thumbnail: "./images/car.jpg",
                github_url: "github.com",
                languages: "C++",
                video_url: "",
                description: "This car is one of my favorite and most fun projects. The car is controlled my iPhone's accelerometer via the Bluefruit app which sends X, Y, Z values to my Particle Argon microcontroller. I wanted to mimic a few existing car features such as autonomous emergency braking and automatic headlights. For the brake system, I implemented an ultrasonic distance sensor to the front of the car and added a piezoelectric speaker that will create a 'beeping' sound that gradually increases in frequency as the car approaches an obstacle. The lights are controlled by a photoresistor and I also integrated a power switch so that the user can turn off the headlights. Additionally, I created an interface on Losant so that I can observe speed, set variable max speeds, and toggle the braking system. The reason why I chose a Particle Argon instead of an Arduino is because it has bluetooth and wifi capabilities. Wifi is needed to connect to additional features on the Losant interface and bluetooth is necessary to communicate with the accelerometer.",
                url: "https://carproject.onlosant.com/dashboard",
                technologies: "Particle, Bluefruit, Losant"
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