/**
 * Authors:Vitória e Guilherme
 *version:1
 *project:Agenda de contatos com html5,Tailwid cc e,
 javascript es6 localstorage
 */
// obtem referencias aos elementos do navegador (DOM)
const contacForm = document.getElementById("contacForm")
const flashMessage = document.getElementById("flashMessage")
const contactlist = document.getElementById("contactList")

// manipulador de evnetos de envio de formulario
contactForm.addEventListener("submit",(event)=>{
  event.preventDefault();
  const editingId = event.submitter.dataset.editingId;

  //verifica se o ID existe no banco de dados
  if(editingId){
    updateContact(editingId);
  }else{
    saveContact();
  }
});

// funcao para salvar o contato no localstorage
function saveContact(){
  const name =document.getElementById("name").Value
  const phone =document.getElementById("phone").value
  const email =document.getElementById("email").value
  const birthdate =document.getElementById("birthdate").value
  //criação do ID do contato
  const id= Date.now().toString()
  contact= {id,name,phone,email,birthdate}
  let contacts= JSON.parse(localStorage.getItem("contacts")) || [];
  //salvar o contato 
  contacts.push(contact)
  localStorage.setItem("contacts", JSON.stringify(contacts))
  showflasMenssage("contato salvo com suceso!")
  contactForm.reset();
  displaycontacts();
}

// funcao para exibir a mensasagem flash
function showflasMenssage(message){
  flashMessage.textContent(message)
  flashMessage.classList.remove("hidden")
  setTimeout(() => {
flashMessage.classList.add("hidden")
  },5000);
}

// funcao para exibir os contatos na tabela 
function displaycontacts(){
  const contacts= JSON.parse(localStorage.getItem("contacts")) || []

  contactlist.innerHTML ="" //limpar a tabela antes de exibir

  // cria o cabeçalho da tabela
  ["Nome","Telefone","E-mail","Data de nascimento","Ações"].forEach((headerText) => {
    const headerCell =hearderRow.insertcell();
    headerCell.textContent=headerText;
    headerCell.classList.add("px-4","py-2","bg-gray-200","text-gray-800","font-bold");//estilo cabeçalho
  });
  contacts.forEach(contact => {
    const row =contactlist.insertRow()
    // excluimos o 'birthdate' para corrigirmos o formato da data
    ["name","phone","email"].foreach(key => {
      const cell =row.insertcell()
      cell.textContent=contact[key]
      cell.classList.add("border-t","px-4","py-2")//estilização das celulas
    })//formata a data de nascimento para o formato brasileiro
    const brithdateCell =row.insertcell()
    const[year,month,day] =contact.brithdate.split
    ("-")// separa os componentes da data
    const brithdate = new Date(year,month-1,day)//formatando a data no padrao brasileiro

    const formattedbirthdate=birthdat.tolocalDateString("pt-BR")
    brithdateCell.textContent =formattedbirthdate
    brithdateCell.classList.add("border-t","px-4","py-2");

    //insere botoes nas celulas
    const actionCell = row.insertcell()
    const editButton =document.createElement("button")
    editButton.innerHTML ="<i class='fas fa-edit'></i>"
    editButton.classList.add("bg-yellow-500","hover:bg-yellow-700","text-white","font-bold",'py-2',"px-4","rounded")
    editButton.addEventListener("click", () => editContact(contact.id))
    actionCell.appenChild(editButton)

  
    const deletButton =document.createElement("button")
    deletButton.innerHTML ="<i class='fas fa-trash-alt'></i>"
    deletButton.classList.add("bg-yellow-500","hover:bg-yellow-700","text-white","font-bold",'py-2',"px-4","rounded","ml-2")
    deletButton.addEventListener("click", () => deletContact(contact.id))
    actionCell.appenChild(deletButton);

    
  
  }) ;

}

// funcao para editar um  contato 
function editContact(id){
  const contacts=JSON.parse(localStorage.getItem("contacts")) || [];
  const contact =contacts.find(c => c.id === id)
  document.getElementById("name").value = contact.name
  document.getElementById("phone").value = contact.phone
  document.getElementById("email").value = contact.email
  document.getElementById("brithdate").value = contact.birthdate
  const submitButton = document.querySelector("#contactForm Button[type='submit']")
  submitButton.textContent = "Atualizar"
  submitButton.dataset.editinId = id
  //limpa o formulario
  contacForm.addEventListener("reset").value, () =>{
    submitButton.textContent="Salvar"
    delete submitButton.dataset.editinId;
  };
}

// funcao para excluir um contato
function deletContact(id){
  const contacts = JSON.parse(localStorage.getItem(contacts)) || []
  const updateContacts =contacts.filter(c=> c.id !== id); 
  localStorage.setItem("contacts", JSON.stringify(updateContacts));
  showflasMenssage("contato excluido com sucesso!");
  displaycontacts();//Atualiza a tela após excluir
}

// funcao para atualizar um contato existente
function updateContact(id){
  const contacts =JSON.parse(localStorage.getItem("contacts")) || [];
  const contact =contacts.findIndex((c) => c.id === id);
// preenche os campos do formulario
if(index !==-1){
  contacts[index] ={
  name:(document.getElementById("name").value = contact.name),
  phone:(document.getElementById("phone").value = contact.phone),
  email:(document.getElementById("email").value = contact.email),
  brithdate:(document.getElementById("brithdate").value = contact.birthdate),
};
localStorage.setItem("contacts", JSON.stringify(contacts))
showflasMenssage("contato atualizado com sucesso")
contactForm.reset()//limpa o formulario
displaycontacts()//atualiza a tabela apos atualizar o contato
}
 
}
// chamar a funcao exibir os contatos ao carregar a pagina 
displaycontacts();