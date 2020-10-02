const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data); 


const server = http.createServer((req,res)=> {
    const { query, pathname } = url.parse(req.url, true);

    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(templateCard,el)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output);
    }
    else if( pathname === '/product'){
        const product = dataObj[query.id];
        const output = replaceTemplate(templateProduct,product);

        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(output)
    }else if( pathname === '/api'){
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