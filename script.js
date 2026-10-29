const listaBotoes = document.querySelectorAll(".filtro");
const galeria = document.querySelector(".galeria");
const listaImagens = document.querySelectorAll(".miniatura");
const totalImagens = document.querySelector("#totalImagens");
const modal = document.querySelector("#modal");
const btnFechar = document.querySelector("#fechar");
const btnAnterior = document.querySelector("#anterior");
const imagemModal = document.querySelector("#imagemModal");
const contador = document.querySelector("#contador");
const nomeImagem = document.querySelector("#nomeImagem");
const autorImagem = document.querySelector("#autorImagem");
const anoImagem = document.querySelector("#anoImagem");
const btnProximo = document.querySelector("#proximo");

let imagensVisiveis = [];
let indiceAtual = 0;

function atualizarImagensVisiveis() {
    imagensVisiveis = Array.from(listaImagens).filter(function (imagem) {
        return !imagem.classList.contains('oculta');
    });

    totalImagens.textContent = `Exibindo ${imagensVisiveis.length} de ${listaImagens.length} imagens`;
}
function filtrarImagens(categoria) {

    // Muda o layout conforme o filtro selecionado
    if (categoria === "todas") {
        galeria.classList.remove("filtrada");
    } else {
        galeria.classList.add("filtrada");
    }

    listaImagens.forEach((imagem) => {
        const categoriaImagem = imagem.dataset.categoria;

        if (categoria === "todas" || categoriaImagem === categoria) {
            imagem.classList.remove("oculta");
            imagem.tabIndex = 0;
        } else {
            imagem.classList.add("oculta");
            imagem.tabIndex = -1;
        }
    });

    atualizarImagensVisiveis();
}
listaBotoes.forEach((botao) => {
    botao.addEventListener("click", () => {
        let categoria = botao.dataset.filtro;

        listaBotoes.forEach((item) => {
            item.classList.remove('ativo');
        });

        botao.classList.add('ativo');

        filtrarImagens(categoria);
    });
});


function mostrarImagem(indice) {
    let quantidade = imagensVisiveis.length;

    if (quantidade === 0) {
        return;
    }

    indiceAtual = (indice + quantidade) % quantidade;

    const imagem = imagensVisiveis[indiceAtual];

    imagemModal.src = imagem.src;
    imagemModal.alt = imagem.alt;

    nomeImagem.textContent = imagem.dataset.titulo || imagem.alt;
    autorImagem.textContent = imagem.dataset.autor || "Artista não informado";
    anoImagem.textContent = imagem.dataset.ano || "Ano não informado";

    contador.textContent = `${indiceAtual + 1} de ${imagensVisiveis.length}`;

    console.log("Título:", imagem.dataset.titulo);
    console.log("Artista:", imagem.dataset.autor);
    console.log("Ano:", imagem.dataset.ano);
}

function abrirModal(imagem) {
    // identificar a posição da imagem clicada
    indiceAtual = imagensVisiveis.indexOf(imagem);

    modal.classList.add("ativo");
    mostrarImagem(indiceAtual);
}

listaImagens.forEach((imagem) => {
    imagem.addEventListener("click", () => {
        abrirModal(imagem);
    });

    imagem.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") {
            abrirModal(imagem);
        }
    });
});

btnFechar.addEventListener("click", () => {
    modal.classList.remove("ativo");
});

modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        modal.classList.remove("ativo");
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        modal.classList.remove("ativo");
    }
});

btnProximo.addEventListener("click", () => {
    mostrarImagem(indiceAtual + 1);
});

btnAnterior.addEventListener("click", () => {
    mostrarImagem(indiceAtual - 1);
});

// movendo com as setas (esquerda e direita)
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        mostrarImagem(indiceAtual - 1);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        mostrarImagem(indiceAtual + 1);
    }
});

filtrarImagens("todas");