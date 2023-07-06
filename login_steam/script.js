window.addEventListener("DOMContentLoaded", function() {
  exibirEntradas(); // Chama a função para exibir as entradas ao carregar a página
});

// Função para abrir e fechar o menu
function abreFechaMenu() {
  var menuBurguer = document.getElementById("menuBurguer");
  if (menuBurguer.style.display == "block") {
    menuBurguer.style.display = "none";
  } else {
    menuBurguer.style.display = "block";
  }
}

// Função APARECER e SUMIR a caixa de busca

// clicar duas vezes para aparecer pela
function procurar() {
  var form = document.getElementById("procurar");
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}
// Fim da função aparecer e sumir a caixa de busca

// Função para abrir o dialog de inserção de imagens
function inserir() {
  var form = document.getElementById("postForm");
  form.style.display = "block";
}

// Função para capturar os dados e imprimir na tela
var entradas = JSON.parse(localStorage.getItem("entradas")) || []; // Array para armazenar as entradas
var entradaAtual = null; // Variável para armazenar a entrada sendo editada

function capturarDados(event) {
  event.preventDefault();

  var titulo = document.getElementById("titulo").value;
  var imagemInput = document.getElementById("imagem");
  var imagem = imagemInput.files[0];
  var data = document.getElementById("data").value;
  var conteudo = document.getElementById("conteudo").value;

  var reader = new FileReader();

  reader.onload = function (e) {
    var entrada = {
      titulo: titulo,
      imagem: e.target.result,
      data: data,
      conteudo: conteudo,
    };

    if (entradaAtual !== null) {
      entradas[entradaAtual] = entrada; // Substitui a entrada atual no array de entradas
      entradaAtual = null; // Limpa a entrada atual
    } else {
      entradas.push(entrada); // Adiciona a entrada ao array de entradas
    }

    localStorage.setItem("entradas", JSON.stringify(entradas)); // Salva as entradas no localStorage

    exibirEntradas(); // Atualiza a exibição das entradas

    // Limpa os campos de entrada do formulário
    document.getElementById("titulo").value = "";
    imagemInput.value = "";
    document.getElementById("data").value = "";
    document.getElementById("conteudo").value = "";

    // Esconde o formulário
    var form = document.getElementById("postForm");
    form.style.display = "none";
  };

  if (imagem) {
    reader.readAsDataURL(imagem);
  } else {
    entrada.imagem = ""; // Mantém a imagem vazia se nenhum arquivo for selecionado
    reader.onload(e); // Chama o onload diretamente sem carregar um arquivo
  }
}

function exibirEntradas() {
  var conteudoInserir = document.getElementById("conteudoInserir");
  conteudoInserir.innerHTML = ""; // Limpa o conteúdo existente

  for (var i = 0; i < entradas.length; i++) {
    var entrada = entradas[i];

    var resultado = document.createElement("div");
    resultado.classList.add("itens");
    resultado.innerHTML =
      "<p>Título: " +
      entrada.titulo +
      "</p>" +
      "<p>Imagem: <img src='" +
      entrada.imagem +
      "'></p>" +
      "<p>Data: " +
      entrada.data +
      "</p>" +
      "<p>Conteúdo: " +
      entrada.conteudo +
      "</p>";

    var botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.addEventListener("click", removerEntrada.bind(null, i)); // Passa o índice da entrada como argumento para a função de remoção

    var botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.addEventListener("click", editarEntrada.bind(null, i)); // Passa o índice da entrada como argumento para a função de edição

    resultado.appendChild(botaoRemover);
    resultado.appendChild(botaoEditar);

    conteudoInserir.appendChild(resultado);
  }
}

function removerEntrada(index) {
  entradas.splice(index, 1); // Remove a entrada do array
  localStorage.setItem("entradas", JSON.stringify(entradas)); // Atualiza o localStorage com as entradas removidas
  exibirEntradas(); // Atualiza a exibição das entradas
}

function editarEntrada(index) {
  entradaAtual = index; // Armazena o índice da entrada sendo editada

  var entrada = entradas[index];

  document.getElementById("titulo").value = entrada.titulo;
  document.getElementById("imagem").value = ""; // Limpa o campo de imagem
  document.getElementById("data").value = entrada.data;
  document.getElementById("conteudo").value = entrada.conteudo;

  var form = document.getElementById("postForm");
  form.onsubmit = function (event) {
    event.preventDefault();
    atualizarEntrada();
  };

  var botaoEnviar = document.querySelector("#postForm button[type='submit']");
  botaoEnviar.textContent = "Atualizar";

  // Exibe o formulário novamente
  form.style.display = "block";
}

function atualizarEntrada() {
  var titulo = document.getElementById("titulo").value;
  var imagemInput = document.getElementById("imagem");
  var imagem = imagemInput.files[0];
  var data = document.getElementById("data").value;
  var conteudo = document.getElementById("conteudo").value;

  var reader = new FileReader();

  reader.onload = function (e) {
    var entrada = {
      titulo: titulo,
      imagem: e.target.result,
      data: data,
      conteudo: conteudo,
    };

    entradas[entradaAtual] = entrada; // Atualiza a entrada no array
    localStorage.setItem("entradas", JSON.stringify(entradas)); // Atualiza o localStorage com as entradas atualizadas

    exibirEntradas(); // Atualiza a exibição das entradas

    var form = document.getElementById("postForm");
    form.onsubmit = capturarDados; // Restaura a função de captura de dados

    var botaoEnviar = document.querySelector("#postForm button[type='submit']");
    botaoEnviar.textContent = "Enviar";

    // Limpa os campos de entrada do formulário
    document.getElementById("titulo").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("data").value = "";
    document.getElementById("conteudo").value = "";

    // Esconde o formulário novamente
    form.style.display = "none";
  };

  if (imagem) {
    reader.readAsDataURL(imagem);
  } else {
    entrada.imagem = ""; // Mantém a imagem vazia se nenhum arquivo for selecionado
    reader.onload(e); // Chama o onload diretamente sem carregar um arquivo
  }
}



// Função de buscar
function buscar() {
  var input = document.getElementById("searchInput");
  var termo = input.value.toLowerCase();
  var itens = document.getElementsByClassName("itens");

  var encontrados = 0; // Contador para verificar se algum resultado foi encontrado

  for (var i = 0; i < itens.length; i++) {
    var item = itens[i];
    var conteudo = item.textContent.toLowerCase();

    if (conteudo.includes(termo)) {
      item.style.display = "block"; // Exibe o item se o termo for encontrado
      encontrados++;
    } else {
      item.style.display = "none"; // Esconde o item se o termo não for encontrado
    }
  }
  // Exibe a mensagem de "não encontrado" se nenhum resultado foi encontrado
  var mensagem = document.createElement("div");
  mensagem.id = ("searchResults");
  var searchResults = document.getElementById("searchResults");

  if (encontrados === 0) {
    searchResults.textContent = "Nenhum resultado encontrado.";
  } else {
    searchResults.textContent = ""; // Limpa a mensagem de resultado não encontrado
    resultado.appendChild(mensagem);
  }
}
// Fim da função de BUSCAR