function abreFechaMenu() {
  var menuBurguer = document.getElementById("menuBurguer");
  if (menuBurguer.style.display == "block") {
    menuBurguer.style.display = "none";
  } else {
    menuBurguer.style.display = "block";
  }
}

/*function inserir() {
  const titulo = prompt("Digite o título do post:");
  const imagem = prompt("Digite o endereço da imagem:");
  const data = prompt("Digite a data:");
  const conteudo = prompt("Digite o conteúdo:");

  // Limpar mensagens de erro existentes
  limparMensagensErro();

  // Realizar validação dos campos
  let isValid = true;

  if (!titulo) {
    isValid = false;
    exibirMensagemErro("titulo", "O título é obrigatório.");
  }

  if (!imagem) {
    isValid = false;
    exibirMensagemErro("imagem", "A imagem é obrigatória.");
  }

  if (!data) {
    isValid = false;
    exibirMensagemErro("data", "A data é obrigatória.");
  }

  if (!conteudo) {
    isValid = false;
    exibirMensagemErro("conteudo", "O conteúdo é obrigatório.");
  }

  if (!isValid) {
    return; // Se algum campo for inválido, interrompa o processo de inserção
  }

  const novoPost = {
    titulo: titulo,
    imagem: imagem,
    data: data,
    conteudo: conteudo,
  };

  // Obter posts existentes do localStorage (se houver)
  let posts = localStorage.getItem("posts");
  if (posts) {
    posts = JSON.parse(posts); // Converter para array JavaScript
  } else {
    posts = []; // Se não houver posts, iniciar com um array vazio
  }

  // Adicionar novo post ao array
  posts.push(novoPost);

  // Salvar o array atualizado no localStorage
  localStorage.setItem("posts", JSON.stringify(posts));

  // Inserir as informações no corpo do site
  var corpoSite = document.getElementById("conteudoInserir");
  let item = document.createElement("div");
  item.innerHTML = `<h1>${novoPost.titulo}</h1><img src="${novoPost.imagem}" alt="Imagem do post" width="300" height="150"><p>Data: ${novoPost.data}</p><p>${novoPost.conteudo}</p>`;
  item.style.background = 'gray';

  var removeButton = document.createElement("button");
  removeButton.innerText = "Remover";
  removeButton.addEventListener("click", function () {
    removerPost(item);
  });

  var editButton = document.createElement("button");
  editButton.innerText = "Editar";
  editButton.addEventListener("click", function () {
    editarPost(novoPost, item);
  });

  item.appendChild(removeButton);
  item.appendChild(editButton);

  corpoSite.appendChild(item);
}

// Função auxiliar para remover um post
function removerPost(item) {
  var corpoSite = document.getElementById("conteudoInserir");
  corpoSite.removeChild(item);

  // Remover post do array no localStorage
  let posts = JSON.parse(localStorage.getItem("posts"));
  const index = Array.from(corpoSite.children).indexOf(item);
  posts.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(posts));
}

// Função auxiliar para editar um post
function editarPost(post, item) {
  const novoTitulo = prompt("Digite o novo título do post:", post.titulo);
  const novaImagem = prompt("Digite o novo endereço da imagem:", post.imagem);
  const novaData = prompt("Digite a nova data:", post.data);
  const novoConteudo = prompt("Digite o novo conteúdo:", post.conteudo);

  post.titulo = novoTitulo;
  post.imagem = novaImagem;
  post.data = novaData;
  post.conteudo = novoConteudo;

  item.innerHTML = `<h1>${post.titulo}</h1><img src="${post.imagem}" alt="Imagem do post" width="300" height="150"><p>Data: ${post.data}</p><p>${post.conteudo}</p>`;

  var removeButton = document.createElement("button");
  removeButton.innerText = "Remover";
  removeButton.addEventListener("click", function () {
    removerPost(item);
  });

  var editButton = document.createElement("button");
  editButton.innerText = "Editar";
  editButton.addEventListener("click", function () {
    editarPost(post, item);
  });

  item.appendChild(removeButton);
  item.appendChild(editButton);

  // Atualizar o post no array no localStorage
  let posts = JSON.parse(localStorage.getItem("posts"));
  const index = Array.from(
    document.getElementById("conteudoInserir").children
  ).indexOf(item);
  posts[index] = post;
  localStorage.setItem("posts", JSON.stringify(posts));
}

function buscar() {
  const termoBusca = prompt("Digite o termo de busca:");
  const conteudoInserir = document.getElementById("conteudoInserir");
  const posts = conteudoInserir.children;
  let resultados = [];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const titulo = post.querySelector("h1").textContent;
    const imagem = post.querySelector("img").getAttribute("src");
    const data = post.querySelector("p:nth-of-type(2)").textContent.slice(6);
    const conteudo = post.querySelector("p:last-of-type").textContent;

    if (
      titulo.includes(termoBusca) ||
      imagem.includes(termoBusca) ||
      data.includes(termoBusca) ||
      conteudo.includes(termoBusca)
    ) {
      const resultado = document.createElement("div");
      resultado.innerHTML = `<p><strong>Título:</strong> ${titulo}</p><p><strong>Imagem:</strong> ${imagem}</p><p><strong>Data:</strong> ${data}</p><p><strong>Conteúdo:</strong> ${conteudo}</p>`;
      resultados.push(resultado);
    }
  }

  if (resultados.length > 0) {
    const resultadoString = resultados
      .map((resultado) => resultado.textContent)
      .join("\n\n");
    alert(`Resultados da busca:\n\n${resultadoString}`);
  } else {
    alert("Nenhum resultado encontrado.");
  }
}

function exibirMensagemErro(campo, mensagem) {
  const elementoCampo = document.getElementById(`campo-${campo}`);
  elementoCampo.classList.add("error");
  elementoCampo.innerText = mensagem;
}

function limparMensagensErro() {
  const elementosErro = document.querySelectorAll(".error");
  elementosErro.forEach((elemento) => {
    elemento.classList.remove("error");
    elemento.innerText = "";
  });
}
*/