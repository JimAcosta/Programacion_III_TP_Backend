export const handleProductStatus = () => {
    const deleteButtons = document.querySelectorAll(".btnBorrar");
    const activateBtns = document.querySelectorAll(".btnActivar");
    const modalEliminarIdSpan = document.getElementById("productIdEliminar");
    const modalActivarIdSpan = document.getElementById("productIdActivar");
    const deleteModal = document.getElementById("confirmModal");
    const activateModal = document.getElementById("activateModal");
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    const confirmActivateBtn = document.getElementById("confirmActivateBtn");
    const cancelBtn = document.querySelectorAll(".cancelBtn");

    let selectedProductId = null;

    // Gestionamos la apertura de los modales de confirmacion
    const openModal = (button, modal, modalSpan) => {
      let currentId = button.getAttribute("data-id");
      selectedProductId = currentId;
      modalSpan.innerHTML = currentId;
      modal.style.display = "flex";
    };

    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        openModal(button, deleteModal, modalEliminarIdSpan);
      });
    });
    activateBtns.forEach((button) => {
      button.addEventListener("click", () => {
        openModal(button, activateModal, modalActivarIdSpan);
      });
    });

    // Gestionamos las acciones de la confirmacion de los modales
    confirmDeleteBtn.addEventListener("click", async () => {
      if (selectedProductId) {
        // Cerramos el modal antes de enviar la peticion para evitar problemas de idempotencia
        deleteModal.style.display = "none";

        try {
          const respuesta = await fetch(`/api/products/${selectedProductId}`, {
            method: "DELETE",
          });

          if (respuesta.ok) {
            // Recargamos para ver la actualizacion del listado
            window.location.href = "/dashboard";
          } else {
            alert("Error al eliminar el producto.");
          }
        } catch (error) {
          console.error(error);
          alert("Error al conectar con el servidor.");
        }
      }
    });

    confirmActivateBtn.addEventListener("click", async () => {
      if (selectedProductId) {
        // Cerramos el modal antes de enviar la peticion para evitar problemas de idempotencia
        activateModal.style.display = "none";
        try {
          let respuesta = await fetch(`/api/products/${selectedProductId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              esta_activo: true,
            }),
          });

          if (respuesta.ok) {
            // Recargamos para ver la actualizacion del listado
            window.location.href = "/dashboard";
          } else {
            alert("Error al activar el producto.");
          }
          return datos;
        } catch (error) {
          console.error("Error: ", error);
        }
      }
    });

    // Gestionamos la cancelacion de la accion de los modales de confirmacion
    cancelBtn.forEach((button) => {
      button.addEventListener("click", () => {
        deleteModal.style.display = "none";
        activateModal.style.display = "none";
        selectedProductId = null;
      });
    });
  };