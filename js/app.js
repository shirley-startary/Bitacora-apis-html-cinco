$(document).ready(function(){
  $('.modal').modal();

});

const containerPublic = document.getElementById('container-publication');

const createComent = function (e){
  e.preventDefault();
  //llamo a los elemento que contienen mi texto
  const inputTitulo = document.getElementById("titulo-coment");
  const inputComent = document.getElementById("message-coment");

  // creo los elemento que se agregarán al DOM
  const containerComent = document.createElement("div");
  const tituloComent = document.createElement("h4");
  const messageComent = document.createElement("p");

  // El texto lo agrego a los elemento recien creados
  tituloComent.innerText = inputTitulo.value;
  messageComent.innerText = inputComent.value;
  containerComent.classList.add("card");

  // Agrego los nuevos elemento a sus contenedores.
  containerComent.appendChild(tituloComent);
  containerComent.appendChild(messageComent);
  containerPublic.appendChild(containerComent);
}

const createPublicImage = function (e) {
  e.preventDefault();
  const titleImage = document.getElementById('titulo-img')
  const inputFile = document.getElementById('input-file');
  console.log(inputFile.files);
  if (!window.FileReader) {
    return; //No soporta archivos
  }
  if (inputFile.files && inputFile.files [0]) {
    const FR = new FileReader();
    FR.addEventListener("load", function(e){
      const containerImage = document.createElement("div");
      const imageElement = document.createElement("img");
      const titleElement = document.createElement("h4");

      containerImage.classList.add("card");
      imageElement.src = e.target.result;
      titleElement.innerText = titleImage.value;

      containerImage.appendChild(titleElement);
      containerImage.appendChild(imageElement);
      containerPublic.appendChild(containerImage);
      // console.log(e.target.result);

    });
    FR.readAsDataURL(inputFile.files[0]);
}
}

const publicComent = document.getElementById('public-coment');
publicComent.addEventListener("submit", createComent);

const publicImage = document.getElementById('public-Image');
publicImage.addEventListener("submit", createPublicImage);
