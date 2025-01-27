let listaDeAmigos = [];
let amigosSorteados = [];

function adicionarAmigo() {
    let amigo = document.getElementById("amigo").value.trim();

    if (amigo === '') {
        alert('Digite o nome do amigo!');
        return;
    }

    amigo = amigo.toLowerCase();

    if (listaDeAmigos.includes(amigo)) {
        alert('Este nome já foi adicionado!');
        return;
    }

    listaDeAmigos.push(amigo);
    document.getElementById('amigo').value = '';
    atualizarListaDeAmigos();

    if (listaDeAmigos.length > 0) {
        document.getElementById('resultado').innerHTML = '';
    }
}

function sortearAmigo() {
    if (listaDeAmigos.length > 0) {
        if (amigosSorteados.length === listaDeAmigos.length) {
            document.getElementById('resultado').innerHTML = 'Todos os amigos já foram sorteados!';
            return;
        }

        let amigoSorteado;
        do { 
            amigoSorteado = listaDeAmigos[Math.floor(Math.random() * listaDeAmigos.length)];
        } while (amigosSorteados.includes(amigoSorteado));

        amigosSorteados.push(amigoSorteado);
        let resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `<p>${capitalizar(amigoSorteado)}</p>`;

        let hideButton = document.createElement('button');
        hideButton.innerText = 'Ocultar Resultado';
        hideButton.classList.add('hide-button');
        hideButton.onclick = function() {
            resultadoDiv.innerHTML = '';
        };
        resultadoDiv.appendChild(hideButton);
    } else {
        document.getElementById('resultado').innerHTML = 'Adicione amigos para sortear!';
    }
}

function atualizarListaDeAmigos() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    listaDeAmigos.forEach((amigo) => {
        let item = document.createElement('li');
        item.innerHTML = capitalizar(amigo);
        lista.appendChild(item);
    });
}

function limparLista() {
    listaDeAmigos = [];
    amigosSorteados = [];
    atualizarListaDeAmigos();
    document.getElementById('resultado').innerHTML = 'A lista foi limpa!';
}

function capitalizar(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1);
}

let input = document.querySelector("input");
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    adicionarAmigo();
  }
});
