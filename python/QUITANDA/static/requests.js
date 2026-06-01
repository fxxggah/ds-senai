const API = "http://127.0.0.1:5000"


// MANIPULAÇÃO DE OBJETOS (DOM).
// Função para exibir mensagens na tela do usuário.
function mostrar_mensagem (texto, tipo) {

    let div = document.getElementById("mensagem");

    // Atribui a classe e o conteudo do HTML a DIV.
    div.className = `alert alert-${tipo} mt-3`;
    div.textContent = texto;

    div.classList.remove("d-none");

    // Define o tempo que a DIV ficará aparecendo na tela.
    setTimeout(() => {
        div.classList.add("d-none");
    }, 4000);
}

// Função para limpar os inputs do formulário de HTML.
function limpar_formulario(){

    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("quantidade").value = "";
}


// MANIPULAÇÃO DO BANCO DE DADOS (CRUD).
// Função para gravar os dados do produto no banco de dados.
function gravar_dados () {

    // Captura o ID do produto.
    let id = document.getElementById("id").value;

    // Objeto com os demais campos do produto.
    let produto = {
        nome: document.getElementById("nome").value,
        marca: document.getElementById("marca").value,
        preco: document.getElementById("preco").value,
        quantidade: document.getElementById("quantidade").value
    };

    // Se o ID for vazio, significa que é um novo cadastro.
    if (id == "") {

        // Faz uma requisição de cadastro (POST).
        fetch(`${API}/api/produtos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        })
        .then(res => res.json())
        .then(dados => {

            if (dados.erro) {
                mostrar_mensagem(dados.erro, "danger");
            } else {
                mostrar_mensagem(dados.mensagem, "success");
            }

            limpar_formulario();
            listar_dados();
        });

    } else {

        // Faz uma requisição de atualização (PUT).
        fetch(`${API}/api/produtos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        })
        .then(res => res.json())
        .then(dados => {

            if (dados.erro) {
                mostrar_mensagem(dados.erro, "danger");
            } else {
                mostrar_mensagem(dados.mensagem, "success");
            }

            limpar_formulario();
            listar_dados();
        });

    }
}

// Funcão para listar dados de produtos salvos no banco de dados.
function listar_dados (){

    // Faz uma requisição de listagem dos dados (GET).
    fetch(`${API}/api/produtos`, {
        method: "GET"
    })
    .then(res => res.json())
    .then(dados => {

        let tabela = document.getElementById("tabela-produtos");
        tabela.innerHTML = "";

        // Preenche a tabela com os dados retornados pelo back-end.
        dados.forEach(produto => {
            tabela.innerHTML += `
                <tr>
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.marca}</td>
                    <td>${produto.preco}</td>
                    <td>${produto.quantidade}</td>
                    <td>
                        <button onclick="carregar_dados(${produto.id})" class="btn btn-warning btn-sm">
                            Editar
                        </button>

                        <button onclick="excluir_dados(${produto.id})" class="btn btn-danger btn-sm">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });
    });
}

// Função para carregar dados de um produto no formulário de HTML.
function carregar_dados (id){

    // Faz uma requisição de buscar dados (GET).
    fetch(`${API}/api/produtos`, {
        method: "GET"
    })
    .then(res => res.json())
    .then(dados => {

        let produto = dados.find(item => item.id == id);

        // Preenche o formulário de HTML com os dados do produto.
        document.getElementById("id").value = produto.id;
        document.getElementById("nome").value = produto.nome;
        document.getElementById("marca").value = produto.marca;
        document.getElementById("preco").value = produto.preco;
        document.getElementById("quantidade").value = produto.quantidade;
    });

}

// Função para excluir dados do banco de dados.
function excluir_dados (id){

    // Faz uma requisição para excluir dados do banco de dados (DELETE).
    fetch(`${API}/api/produtos/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(dados => {

        if (dados.erro){
            mostrar_mensagem(dados.erro, "danger");
        } else {
            mostrar_mensagem(dados.mensagem, "success");
        }

        listar_dados();
    });
}

// Carrega os dados ao abrir a aplicação.
listar_dados();
