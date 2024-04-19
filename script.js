const userContainer = document.getElementById("user-list");
const getInfos = async () => {
  try {
    const response = await api.get("/");
    const contatos = response.data;
    console.log(contatos);
    renderContatos({ contatos }); // Chame a função renderContatos após a obtenção dos dados
  } catch (error) {
    console.error("Erro ao obter contatos:", error);
  }
};

async function renderContatos({ contatos }) {
  userContainer.innerHTML = "";
  contatos.forEach((contato) => {
    const user = document.createElement("div");

    user.innerHTML += `
      <div class="col-12">
        <div class="card my-2" alt="">
        <img src="${contato.avatar}" class="card-img-top" alt="Avatar de ${contato.name}" />
          <div class="card-body">
            <h5 class="card-title"><b>Nome:</b>${contato.name}</h5>
            <p class="card-text"><b>Telefone:</b>${contato.phone}</p>
          </div>
        </div>
      </div>
    `;
    userContainer.appendChild(user); // Adicione o card ao contêiner de usuário
  });
}
// barra de pesquisa-------
async function pesquisarPessoas() {
  const searchInput = document.getElementById("searchInput");

  try {
    //pesquisa por outros valores
    const response = await api.get(`/?name=${searchInput.value}`);
    const contatos = response.data;

    userContainer.innerHTML = "";

    contatos.forEach((contato) => {
      renderContatos({ contatos });
    });
  } catch (error) {
    console.log(error);
  }
}

getInfos();
