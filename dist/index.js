"use strict";
const options = [
    "Materiales de Construcción",
    "Maderas y Tableros",
    "Herramientas Eléctricas y Maquinaria",
    "Herramientas Manuales",
    "Ferretería General",
    "Pisos y Revestimientos",
    "Pinturas y Accesorios",
    "Plomería y Gas",
    "Electricidad e Iluminación",
    "Baños",
    "Cocinas",
    "Muebles de Interior",
    "Decoración y Textil Hogar",
    "Organización y Ordenamiento",
    "Jardín y Aire Libre",
    "Muebles de Jardín y Camping",
    "Climatización",
    "Electrodomésticos y Cocción",
    "Seguridad y Domótica",
    "Aberturas",
];
const tablaProductos = document.querySelector('#tablaProductos');
const addbutton = document.querySelector('#add');
const filterbutton = document.querySelector('#filter');
const addname = document.querySelector('#addname');
const addcat = document.querySelector('#addcat');
const addprice = document.querySelector('#addprice');
const addstock = document.querySelector('#addstock');
const filtername = document.querySelector('#filtername');
const filtercat = document.querySelector('#filtercat');
const filterdisp = document.querySelector('#filterdisp');
const filterprice = document.querySelector('#filterprice');
const tablafiltro1 = document.querySelector('#tablafiltro1');
const tablafiltro2 = document.querySelector('#tablafiltro2');
if (filtername && filtercat && filterdisp && filterprice) {
    filtercat.value = "";
    filterdisp.value = "";
    filterprice.value = "";
}
if (addcat && filtercat) {
    options.forEach(element => {
        addcat.innerHTML += `<option value="${element}">${element}</option>`;
    });
}
const Listaproductos = new Set();
function actualizarLista() {
    if (!tablaProductos || !tablafiltro1 || !tablafiltro2) {
        console.error("No se encontró el elemento #tablaProductos");
        return;
    }
    tablafiltro1.innerHTML = "";
    tablafiltro2.innerHTML = "";
    const filas = [...Listaproductos]
        .map((element) => `
                <tr>
                    <td>${element.nombre}</td>
                    <td>${element.categoria}</td>
                    <td>$${element.precio}</td>
                    <td>${element.stock}</td>
                </tr>
            `)
        .join("");
    tablaProductos.innerHTML = filas;
    let index = 0;
    Listaproductos.forEach((producto) => {
        if (index % 2 == 0) {
            tablafiltro1.innerHTML += `
                <tr>
                    <td>${producto.nombre}</td>
                    <td>${producto.stock}</td>
                </tr>
            `;
        }
        else {
            tablafiltro2.innerHTML += `
                <tr>
                    <td>${producto.nombre}</td>
                    <td>${producto.stock}</td>
                </tr>
            `;
        }
        index++;
    });
}
addbutton?.addEventListener("click", () => {
    let prod = {
        nombre: String(addname?.value),
        categoria: String(addcat?.value),
        precio: Number(addprice?.value),
        stock: Number(addstock?.value),
    };
    Listaproductos.add(prod);
    actualizarLista();
});
filterbutton?.addEventListener("click", () => {
    if (!filtername || !filtercat || !filterdisp || !filterprice) {
        return null;
    }
    filtercat.value = "";
    filterdisp.value = "";
    filterprice.value = "";
    Listaproductos.forEach(element => {
        if (element.nombre.includes(filtername.value)) {
            filtercat.value = element.categoria;
            if (element.nombre.includes(filtername.value)) {
                filtercat.value = element.categoria;
                if (element.stock < 10) {
                    filterdisp.value = "Baja";
                }
                else if (element.stock < 50) {
                    filterdisp.value = "Media";
                }
                else {
                    filterdisp.value = "Alta";
                }
            }
            filterprice.value = String(element.precio);
        }
    });
});
