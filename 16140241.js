const palabraElemento = document.getElementById('palabra');
const letraElemento = document.getElementById('letras');
const imagenElemento = document.getElementById('muerto');
const abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
const intentos = 6;
const palabras = ['HAMBURGUESA','CHURRUMAIS','COMPUTADORA','JAVASCRIPT','PROGRAMACION', 'TELEFONO','GARNACHAS','FRAMEWORKS','PROCESADOR','PLATANITOS'] 
let intentoActual = 0;

//Obtiene palabra al azar
const palabraSeleccionada = palabras[Math.floor(Math.random()*palabras.length)];
const palabraAdivinar = palabraSeleccionada.split('');
const palabraMostrar = [];

//Pone la palabra con _
const palabraEscondida = () =>{
  for(let letra of palabraAdivinar){
    palabraMostrar.push('_');
  }
  palabraElemento.innerHTML = palabraMostrar.join(' ');
  // console.log(palabraAdivinar);

  //
  imagenElemento.innerHTML = `<img src="assets/muerto${intentoActual}.png" 
  alt="" class="img-fluid">`

}
palabraEscondida();


const imprimeAbecedario = () =>{
  const botonLetra = abecedario.split('').map(
    letter =>`
      <button class="btn btn-primary mt-2 mr-1" value="${letter}" onclick="onClickLetra(this.id)" id="${letter}">${letter}</button>
    `
  ).join('');
  letraElemento.innerHTML = botonLetra;
}
imprimeAbecedario();



const reducirIntentos = () => {
  //Boton intentos
  let intentoBoton = document.getElementById("intentos");
  //Reducir intento
  intentoActual += 1;

  intentoBoton.innerText = `Tienes ${intentos - intentoActual} intentos`
  //Validar intentos
  if(intentoActual === intentos){
    
    Swal.fire(
      {
        title: 'HAS PERDIDO! :c',
        text: "Confirma para jugar de nuevo",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, jugar de nuevo!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      }
    )
  }
  
}

const verificaLetra = letra => {
  
  for (const [posicion, letraAdivinar] of palabraAdivinar.entries()){
    if(letra === letraAdivinar) {
      palabraMostrar[posicion] = letraAdivinar;
      //Imprimir palabra en el html
      palabraElemento.innerHTML = palabraMostrar.join(' ');
    }
  }
  //Si no está la letra reduce un intento
  if(!palabraAdivinar.includes(letra)){
    reducirIntentos();
    imagenElemento.innerHTML = `<img src="assets/muerto${intentoActual}.png" 
  alt="" class="img-fluid">`
  }

  //Si completo toda la palabra gana y recarga
  if(!palabraMostrar.includes('_')){
    Swal.fire(
      {
        title: 'HAS GANADO! n_n',
        text: "Confirma para jugar de nuevo",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, jugar de nuevo!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      }
    )
  }
};

//onClick boton
const onClickLetra = (id) => {

  const letra = document.getElementById(id);

  //Verificar si es la letra
  verificaLetra(letra.value);
  
  
  //Efectuar cambio en el mono
  
  
  //Deshabilitar la letra
  letra.disabled=true;
}