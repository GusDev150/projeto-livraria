const params = new URLSearchParams(window.location.search)
const idLivro = params.get('id')

fetch(`https://localhost:3000/livros/${idLivro}`)
    .then(res => res.json())
    .then(livro => {

        document.getElementById('livro-titulo').innerText = livro.titulo 
        document.getElementById('').innerText = 'Autor: ' + livro.autor
        document.getElementById('').innerText = livro.descricao
        document.getElementById('').innerText = `R$ ${Number(livro.preco).toFixed(2)}`

        criarGaleria(livro.imagens)
    })

function criarGaleria(imagens) {
    const imagensPrincipal = document.getElementById('imagem-principal')
    const miniaturasDiv = document.getElementById('miniaturas')
    const btnAnterior = document.getElementById('btn-anterior')
    const btnProximo = document.getElementById('btn-proximo')

    let indiceAtual = 0
    imagensPrincipal.src = imagens[indiceAtual]

    imagens.forEach((src, index) => {
        const img = document.createElement('img')
        img.src = src
        img.classList.add('miniatura')

        if (index === 0) img.classList.add('ativa')
        
        img.addEventListener('click', () => {
            indiceAtual = index
            atualizarImagem()
        })

        miniaturasDiv.appendChild(img)
    });

    function atualizarImagem() {
        imagensPrincipal.src = imagens[indiceAtual]

        document.querySelectorAll('.miniatura').forEach((img, i) => {
            img.classList.toggle('ativa', i === indiceAtual)
        })
    }

    btnProximo.addEventListener('click', () => {
        indiceAtual = (indiceAtual + 1) % imagens.length
        atualizarImagem()
    })

    btnProximo.addEventListener('click', () => {
        indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length
        atualizarImagem()
    })
}