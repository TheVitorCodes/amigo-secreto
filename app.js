let listaDeAmigos = [];

function adicionarAmigo() {
    let amigo = document.getElementById("amigo").value.trim();

    if (amigo === '') {
        alert('Digite o nome do amigo!');
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
        let amigoSorteado = listaDeAmigos[Math.floor(Math.random() * listaDeAmigos.length)];
        document.getElementById('resultado').innerHTML = amigoSorteado;
    } else {
        document.getElementById('resultado').innerHTML = 'Adicione amigos para sortear!';
    }
}

function atualizarListaDeAmigos() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    listaDeAmigos.forEach((amigo) => {
        let item = document.createElement('li');
        item.innerHTML = amigo;
        lista.appendChild(item);
    });
}

let input = document.querySelector("input");
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    adicionarAmigo();
  }
});