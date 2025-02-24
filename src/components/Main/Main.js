  import "./Main.css";
  import { createApi } from "unsplash-js";
  
  //? Configuración de la API de Unsplash
  const unsplash = createApi({
    accessKey: import.meta.env.VITE_ACCESS_KEY,
  });
  
  //? Plantilla para cada tarjeta de imagen
  const cardTemplate = (item) => {
    return `
      <li class="gallery-item" style="background-image: url(${item.urls.regular}); border: 10px solid ${item.color}">
        <div class="info">
          <div class="save-btn">
            <button>Guardar</button>
          </div>
          <div class="links">
            <a href="${item.links.html}" class="full-link">${item.links.html}</a>
            <div>
              <a href="${item.urls.full}" target="_blank" class="links-icon">
                <img src="/public/assets2/imagen.png" alt="Ver Imagen"/>
              </a>
              <a href="#null" class="links-icon">
                <img src="/public/assets2/signo-de-mas.png" alt="Más imágenes"/>
              </a>    
            </div>
          </div>
        </div>
      </li>
    `;
  };
  
  //? Función para obtener imágenes desde Unsplash
  const searchPhotos = async (keyword) => {
    try {
      const response = await unsplash.search.getPhotos({
        query: keyword,
        page: 1,
        perPage: 30,
      });
  
      if (!response.response || !response.response.results) {
        console.error("Error en la API de Unsplash:", response);
        return [];
      }
  
      return response.response.results; //? Devuelve el array de imágenes
    } catch (error) {
      console.error("Error al obtener imágenes:", error);
      return []; //? Devuelve un array vacío en caso de error
    }
  };
  
  //? Plantilla de la galería
  const galleryTemplate = () => {
    return `<ul class="gallery"></ul>`;
  };
  
  //? Función para mostrar imágenes en la galería
  const printItems = (items) => {
    const gallery = document.querySelector(".gallery");
  
    if (!gallery) {
      console.error("No se encontró la galería en el DOM.");
      return;
    }
  
    gallery.innerHTML = ""; //? Limpiar galería antes de agregar nuevas imágenes
  
    if (items.length === 0) {
      gallery.innerHTML = `<p class="no-results">No se encontraron imágenes</p>`;
      return;
    }
  
    items.forEach((item) => {
      gallery.innerHTML += cardTemplate(item);
    });
  };
  
  //? Función que escucha los eventos del input y botón de búsqueda
  const galleryListeners = () => {
    setTimeout(() => {
      const input = document.querySelector("#searchinput");
      const btn = document.querySelector("#searchbtn");
  
      if (!input || !btn) {
        console.error("No se encontraron los elementos del input o botón.");
        return;
      }
  
      const showCustomAlert = (message) => {
        //? Verificar si ya hay una alerta en pantalla
        let existingAlert = document.querySelector(".custom-alert");
        if (existingAlert) existingAlert.remove();
      
        //? Crear el contenedor de la alerta
        const alertBox = document.createElement("div");
        alertBox.classList.add("custom-alert");
        alertBox.innerHTML = `
          <p>${message}</p>
          <button id="close-alert">Aceptar</button>
        `;
      
        document.body.appendChild(alertBox);
      
        //? Cerrar con botón
        document.getElementById("close-alert").addEventListener("click", () => {
          alertBox.remove();
        });
      
        //? Cerrar automáticamente después de 8 segundos
        setTimeout(() => {
          alertBox.remove();
        }, 8000);
      };
      
      const performSearch = async () => {
        const input = document.querySelector("#searchinput");
        const keyword = input.value.trim();
      
        if (!keyword) return; //? Evita búsquedas vacías
      
        const images = await searchPhotos(keyword);
      
        if (images.length === 0) {
          const fallbackImages = await searchPhotos("gatos");
          printItems(fallbackImages);
          showCustomAlert("No se encontraron imágenes. Prueba con otra palabra. Mientras te mostramos imagenes de gatos.");
        } else {
          printItems(images);
        }
      
        input.value = ""; //? Limpiar input después de la búsqueda
      };
  
      //? Evento para hacer clic en el botón de búsqueda
      btn.addEventListener("click", performSearch);
  
      //? Evento para presionar Enter en el input
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault(); //? Evita que la página se recargue
          performSearch();
        }
      });
    }, 500); //? Esperamos un poco a que el DOM cargue los elementos
  };
  
  //? Función para renderizar la galería y hacer la primera búsqueda
  const printTemplate = async () => {
    const mainElement = document.querySelector("main");
  
    if (!mainElement) {
      console.error("No se encontró la etiqueta <main> en el HTML.");
      return;
    }
  
    mainElement.innerHTML = galleryTemplate();
    galleryListeners(); //? Agregar eventos de búsqueda
  
    //? Cargar imágenes por defecto (moon)
    const images = await searchPhotos("moon");
  
    if (images.length > 0) {
      printItems(images);
    } else {
      console.warn("No se pudieron cargar las imágenes de 'moon'.");
    }
  };
  
  printTemplate();
  
  export default printTemplate;  