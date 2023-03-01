//variables
const formulario = document.querySelector('#cotizar-seguro');

//Constructores

function Seguros(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//prototype realiza cotizacion
Seguros.prototype.cotizarSeguro = function () {
    /**
     * Si es la opcion 
     *  1: Americano 1.15
     *  2:Asiatico 1.05
     *  3:Europeao 1.35
     */
    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;

        case '2':
            cantidad = base * 1.05;
            break;

        case '3':
            cantidad = base * 1.35;
            break;

        default:

            break;
    }


    // leer el year
    //Cada year que la diferencia es mayor el costo va a reducirse 3% 

    let yearActual = new Date().getFullYear();
    let dif = yearActual - this.year;
    // const nuevoCosto = 0;
    // while (dif > 0) {
    //     nuevoCosto = cantidad * 0.03;
    //     console.log(nuevoCosto);
    //     nuevoCosto = cantidad - nuevoCosto;
    //     dif--;
    // }
    cantidad -= ((dif * 3) * cantidad) / 100;
    console.log(dif);
    //Si el seguro es basico se multiplica por un 30% mas
    //Si el seguro es completo se multiplica por un 50% ms
    if (this.tipo === 'basico') {
        // cantidad = ((cantidad * 0.3) + cantidad);
        cantidad *= 1.30;
        // console.log(cantidad);
    } else if (this.tipo === 'completo') {
        cantidad *= 1.50;
    }

    return cantidad;
}

function UI() { }

//Prototypes
UI.prototype.llenarYear = () => {

    const max = new Date().getFullYear(),
        min = max - 20;

    const select = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }
}

//Muestra alertas en pantalla
UI.prototype.mostratAlertas = (mensaje, tipo) => {

    const div = document.createElement('DIV');

    if (tipo === 'error') {
        div.classList.add('mensaje', 'error');
    } else {
        div.classList.add('mensaje', 'correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

//Muestra 
UI.prototype.mostrarResultado = (seguro, total) => {
    const { marca, year, tipo } = seguro;

    let textoMarca;
    switch (marca) {
        case '1':
            textoMarca = 'Americano';
            break;

        case '2':
            textoMarca = 'Asiatico';

            break;

        case '3':
            textoMarca = 'Europeo';

            break;

        default:
            break;
    }
    //limpiar HTML para mostrar el siguiente resultado
    ui.limpiarHTML();

    const div = document.createElement('DIV');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header"> Tu resumen </p>
        <p class="font-bold"> Marca: <span class="font-normal"> ${textoMarca} </span> </p>
        <p class="font-bold"> Año: <span class="font-normal"> ${year} </span> </p>
        <p class="font-bold"> Tipo Seguro: <span class="font-normal"> ${tipo} </span> </p>
        <p class="font-bold"> Total: <span class="font-normal">$ ${total} </span> </p>
    `;

    const resultado = document.querySelector('#resultado');


    //Mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';//se borra el spinner pero se muestra el resultado 
        resultado.appendChild(div);
    }, 3000);
}

//Limpiar HTML
UI.prototype.limpiarHTML = () => {

    const resultado = document.querySelector('#resultado');
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);

    }
}

//Instanciar UI
const ui = new UI();

//event listeners
document.addEventListener('DOMContentLoaded', () => {
    //Llena el select con los años 
    ui.llenarYear();
});


//Funciones
eventListeners();
function eventListeners() {
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();

    //Leer la marca seleccionada
    const marca = document.querySelector('#marca').value;

    // leer el year seleccionado
    const year = document.querySelector('#year').value;

    //leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '') {
        ui.mostratAlertas('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostratAlertas('Transaccion en curso', 'correcto');

    //Instanciar el seguro
    const seguro = new Seguros(marca, year, tipo);

    //utilizar el prototype que va a cotizar
    const total = seguro.cotizarSeguro();

    //Utilizar el prototype que va a cotizar
    ui.mostrarResultado(seguro, total);
}