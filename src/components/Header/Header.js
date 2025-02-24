import "./Header.css";
import printTemplate from "../Main/Main";

//? HEADER 
const headerTemplate = () => {
  return `
    <h1 id="logo">IPS</h1>
    <input type="search" placeholder="Buscar" id="searchinput"/>
    <button id="searchbtn">
      <img src="/public/assets1/buscar.png" alt="Icono de búsqueda"/>
    </button>
    <button id="darkmodebtn">
      <img src="/public/assets1/modo-claro-oscuro.png" alt="Modo Claro, Oscuro" id="darkmodeicon"/>
    </button>
    <img src="/public/assets1/agregar-usuario.png" alt="Imagen de Perfil" class="profileimg"/>
    <div id="menu" class="menu">
      <img src="/public/assets2/menu.png" alt="Icono del menú"/>
      <ul id="menu-items">
        <li id="light-mode">Modo Claro</li>
        <li id="dark-mode">Modo Oscuro</li>
        <li id="user-profile">Perfil de Usuario</li>
      </ul>
    </div>
  `;
};

document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu');
  const menuItems = document.getElementById('menu-items');
  const lightModeItem = document.getElementById('light-mode');
  const darkModeItem = document.getElementById('dark-mode');
  const userProfileItem = document.getElementById('user-profile');

  //! Mostrar/ocultar el menú al hacer clic en el contenedor #menu
  menu.addEventListener('click', (event) => {
    event.stopPropagation(); //? Evita que se cierre inmediatamente al hacer clic dentro del menú
    menuItems.style.display =
      menuItems.style.display === 'block' ? 'none' : 'block';
  });

  //! Ocultar el menú al hacer clic fuera de él
  document.addEventListener('click', () => {
    menuItems.style.display = 'none';
  });

  //! Acción para "Modo Claro"
  lightModeItem.addEventListener('click', () => {
    document.body.classList.remove('dark');
  });

  //! Acción para "Modo Oscuro"
  darkModeItem.addEventListener('click', () => {
    document.body.classList.add('dark');
  });

  //! Acción para "Perfil de Usuario"
  userProfileItem.addEventListener('click', () => {
    console.log('Perfil de usuario seleccionado');
  });
});

const themeSwitch = () => {
  document.body.classList.toggle("dark")
}

const listeners = () => {
  const darkmodebtn = document.querySelector("#darkmodebtn")
  darkmodebtn.addEventListener("click", () => {
    themeSwitch()
    const theme = document.body.classList.contains("dark")
    if (theme) {
      document.querySelector("#darkmodeicon").src = "/public/assets2/modo-oscuro.png";
    } else {
      document.querySelector("#darkmodeicon").src = "/public/assets1/modo-claro.png";
    }
  })

  /*const logo = document.querySelector("#logo");
  logo.addEventListener("click", async () => {
    const images = await searchPhotos ("moon");
    printItems(images.response.results);
  });*/

  const logo = document.querySelector("#logo");
  logo.addEventListener("click", () => {
    printTemplate(); // Esto vuelve a renderizar la galería con la búsqueda "moon"
  });
}

const printHeaderTemplate = () => {
  document.querySelector("header").innerHTML = headerTemplate()
  listeners()
}

printHeaderTemplate();

export default printHeaderTemplate; 
