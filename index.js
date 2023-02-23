const express = require("express");
const handlebars = require("express-handlebars");
const router = require("./config/router");
const logger = require("morgan");
const sass = require("node-sass-middleware");

const app = express();
const PORT = 3000;



app.engine("handlebars", handlebars.engine({
    helpers: require(`${__dirname}/app/views/helpers`)
}));

app.set("view engine", "handlebars");
app.set("views", `${__dirname}/app/views`);

app.use(sass({
    src: `${__dirname}/public/scss`,
    dest: `${__dirname}/public/css`,
    outputStyle: 'compressed',
    prefix: '/css'
}));

app.use("/img",express.static(`${__dirname}/public/img`));
app.use("/css",express.static(`${__dirname}/public/css`));
app.use("/webfonts", express.static(`${__dirname}/node_modules/@fontawesome/fontawesome-free/webfonts`));

app.use("/js", [
    express.static(__dirname + '/node_modules/bootstrap/dist/js')
]);

app.use(logger("combined"));
app.use(express.urlencoded({extended: false}));
app.use(router);

app.listen(PORT, () =>{
    console.log(`Express app iniciada na porta ${PORT}.`);
});
