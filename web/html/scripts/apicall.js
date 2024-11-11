const bunyanbutton = document.querySelector('#bunyan');
bunyanbutton.addEventListener('click', () => {
    const Http = new XMLHttpRequest();
    const url = 'http://localhost/api/bunyan';
    Http.open("GET", url);
    Http.send();
    
    Http.onreadystatechange=(e)=>{
        console.log(Http.responseText);
    }
});

const pinobutton = document.querySelector('#pino');
pinobutton.addEventListener('click', () => {
    const Http = new XMLHttpRequest();
    const url = 'http://localhost/api/pino';
    Http.open("GET", url);
    Http.send();
    
    Http.onreadystatechange=(e)=>{
        console.log(Http.responseText);
    }
});

const winstonbutton = document.querySelector('#winston');
winstonbutton.addEventListener('click', () => {
    const Http = new XMLHttpRequest();
    const url = 'http://localhost/api/winston';
    Http.open("GET", url);
    Http.send();
    
    Http.onreadystatechange=(e)=>{
        console.log(Http.responseText);
    }
});