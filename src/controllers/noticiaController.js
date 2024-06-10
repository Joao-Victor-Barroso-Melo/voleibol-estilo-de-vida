const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('58d19560e8ea40edb645bdefe0fe5b7a');
function listar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

        // To query /v2/top-headlines
        // All options passed to topHeadlines are optional, but you need to include at least one of them
        newsapi.v2.everything({
            q: 'vôlei',
            language: 'pt',
            sortBy: 'publishedAt'
        }).then(response => {
            console.log(response);
            res.json(response)
        });
    
}
function listarPorQuantidade(req, res) {
    const qtdNoticias = req.params.qtdNoticias
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

        // To query /v2/top-headlines
        // All options passed to topHeadlines are optional, but you need to include at least one of them
        newsapi.v2.everything({
            q: 'vôlei',
            language: 'pt',
            sortBy: 'publishedAt',
            pageSize: qtdNoticias
        }).then(response => {
            console.log(response);
            res.json(response)
        });
    
}

module.exports = {
    listar,
    listarPorQuantidade
}