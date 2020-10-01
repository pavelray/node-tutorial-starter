const fs = require('fs');
const http = require('http');
const url = require('url');

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data); 

const server = http.createServer((req,res)=> {
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});

        // const cardsHtml = dataObj.map()


        res.end(templateOverview);
    }
    else if( pathName === '/product'){
        res.end('This is Product')
    }else if( pathName === '/api'){
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data)
    }else{
        res.writeHead(404,{
            'Content-type': 'text/html'
        }); // alwasy need to set header before
        res.end('<h1>Page Not found</h1>');
    }
});

server.listen(8000, '127.0.0.1', ()=> {
    console.log('Server Listinging on 8000');
})