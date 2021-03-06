var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')

router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/', (req,res) => {
    var body = req.body;
    if(body.year_low == '')
        body.year_low = 0;
    if(body.year_high == '')
        body.year_high = 9999;
    if(body.cast == '')
        body.cast = [];
    else
        body.cast = body.cast.split(',');
    if(body.genres == '')
        body.genres = [];
    else
        body.genres = body.genres.split(',');

    Filmes.filtrar(body)
        .then(dados => res.render('filmes', {filmes: dados}))
        .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
