
/*
CRUD: Create, Read, Update and Delete;

O armanezamento desse CRUD será salvo no localStorage, que é um objeto JavaScript,
usado para armazenar dados no próprio navegador;
*/

//Função de Automação do QuerySelector;
function qS(query) {
    return document.querySelector(query);
};

//Variáveis Modais;
const modal = qS('.modal-container');
const tBody = qS('tbody');
const sNome = qS('#m-nome');
const sFuncao = qS('#m-funcao');
const sSalario = qS('#m-salario');

const btnEdit = qS('#edit');
const btnDelete = qS('#delete');
const btnSalvar = qS('#btnSalvar');

//Variáveis Locais;
let itens = [];
let id;

//Abre o modal para cadastro ou edição;
function openModal() {

    if (modal.style.display == "flex") {
        modal.style.display = "none";
    } else {
        modal.style.display = "flex";
    }

};
//######CRUD#######;

//Create;
//Vai criar e salvar os itens no Storage do Navegador;
function setItensBD() {
    localStorage.setItem('dbfunc', JSON.stringify(itens));
};

btnSalvar.addEventListener('click', (e) => {
        
    e.preventDefault();

    if (id == undefined) {
        itens.push(
            {
                'nome': sNome.value,
                'funcao': sFuncao.value,
                'salario': sSalario.value
            }
        );
    } else {
        itens[id].nome = sNome.value;
        itens[id].funcao = sFuncao.value;
        itens[id].salario = sSalario.value;
    }

    id = undefined;

    sNome.value = '';
    sFuncao.value = '';
    sSalario.value = '';

    setItensBD();
    openModal();
    loadItens();

});

//Read;
//Função que vai pegar os itens do Storage;
const getItensBD = () => {
    return JSON.parse(localStorage.getItem('dbfunc'));
};

//Update;
//Função para editar um cadastro;
function editItem(index) {
    openModal();
    sNome.value = itens[index].nome;
    sFuncao.value = itens[index].funcao;
    sSalario.value = itens[index].salario;
    id = index;
};

//Delete;
//Função para deletar um cadastro;
function deleteItem(index) {
    itens.splice(index, 1);
    loadItens();
    setItensBD();
};

//###############################################################

function loadItens() {
    itens == getItensBD();
    tBody.innerHTML = '';

    itens.forEach((item, index) => {
        let tr = document.createElement('tr');
        
        tr.innerHTML = `   
        <td>${item.nome}</td>
        <td>${item.funcao}</td>
        <td>${item.salario}</td>
        
        <td class="acao">
            <button onclick="editItem(${index})">
                <i class="bx bx-edit"></i>
            </button>
        </td>
        
        <td class="acao">
            <button onclick="deleteItem(${index})">
                <i class="bx bx-trash"></i>
            </button>
        </td>
        `
        tBody.appendChild(tr);      
    });
}

loadItens();


