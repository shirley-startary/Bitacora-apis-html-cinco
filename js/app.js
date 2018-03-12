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
  //explicar
  if (!window.FileReader) {
    return; //No soporta archivos
  }
  if (inputFile.files && inputFile.files [0]) {
    const FR = new FileReader();
    //explicar
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
    //explicar
    FR.readAsDataURL(inputFile.files[0]);
  }
}

const createEvent = function (e) {
  e.preventDefault();
  //llamo a los elementos de mi html de donde extraigo el texto
  const titleEvent = document.getElementById('titulo-date');
  const date = document.getElementById('date');

  //creamos los elementos que insertaremos en el DOM
  const containerEvent = document.createElement("div");
  const titleElement = document.createElement("h4");
  const dateEvent = document.createElement("p");
  const containerMap = document.createElement("div");

  containerEvent.classList.add("card");
  titleElement.innerText = titleEvent.value;
  dateEvent.innerText = date.value;
  containerMap.id = "map";

  containerEvent.appendChild(titleElement);
  containerEvent.appendChild(dateEvent);
  containerEvent.appendChild(containerMap);
  containerPublic.appendChild(containerEvent);
  getUbication()
}

const getUbication = function () {
  /*Con el siguiente if hacemos la comprobacion que nuestro navegador puede
  acceder al objeto navigator*/
  if (navigator.geolocation) {
    /*Llamamos al metodo getCurrentPosition() que pide dos callback
    la primer funcion es si se obtuvo la ubicacion y
    la segundo por si ocurrio un error*/
    navigator.geolocation.getCurrentPosition(showPosition, error);
  } else {
    alert("Actualiza tu Navegador")
  }
}

const showPosition = function (position) {
  //position obtiene un objeto donde podemos acceder a informacion de geolocalizacion

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  const coordenadas = {
    lat: lat,
    lng: lon
  }
  showMap(coordenadas);
}

const showMap = function (coordenadas) {
  // las propiedades del objeto deben de ser siempre {lat: , lng:}
  var uluru = coordenadas;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

const error = function () {
  alert("No obtuvimos la ubicacion")
}

const createPublicMedia = function (e) {
  e.preventDefault();
  const titleText = document.getElementById('titulo-media').value;
  const fileMedia = document.getElementById('file-video');
  // console.log(titleText, fileMedia.files[0].type);
  const titleFile = document.createElement('h4');
  const containerMedia = document.createElement('div');
  titleFile.innerText = titleText;
  containerMedia.appendChild(titleFile);

  if (!window.FileReader) {
    return; //No soporta lectura de archivos
  }

  if (fileMedia.files && fileMedia.files[0]) {
    /* Devuelve una nueva construcción FileReader.
    permite que la web lea asincronamente los contenidos del archivo*/
    const FR = new FileReader();
    FR.addEventListener("load", function (e) {
      //Al acceder a e.targe.result, estamos accediendo a la data del archivo
      let arrayElemento = e.target.result.split("/");
      if (arrayElemento[0].split(":")[1] === "video") {
        const video = document.createElement("video");
        video.src = e.target.result;
        video.classList.add("responsive-video")
        video.setAttribute("controls", true);
        containerMedia.appendChild(video);
      } else {
        const audio = document.createElement("audio");
        audio.src = e.target.result;
        audio.setAttribute("controls", true);
        containerMedia.appendChild(audio);
      }

    });
    /*Método que comienza a leer el contenido, una vez finalizada el "result"
    atributo contiene una una data:URL que representan los datos del archivo*/
    FR.readAsDataURL(fileMedia.files[0])
  }
  containerPublic.appendChild(containerMedia);
}



const publicComent = document.getElementById('public-coment');
publicComent.addEventListener("submit", createComent);

const publicImage = document.getElementById('public-Image');
publicImage.addEventListener("submit", createPublicImage);

const publicEvent = document.getElementById('public-date');
publicEvent.addEventListener("submit", createEvent);

const publicMedia = document.getElementById('public-media');
publicMedia.addEventListener("submit", createPublicMedia);
