document.addEventListener('DOMContentLoaded', function() {
    // File upload preview
    const fileInput = document.getElementById('evidencia');
    const previewContainer = document.getElementById('previewFiles');
            
    fileInput.addEventListener('change', function() {
        previewContainer.innerHTML = '';
        
        if (this.files.length === 0) {
            previewContainer.classList.add('hidden');
            return;
        }
                
    previewContainer.classList.remove('hidden');
                
    for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        const reader = new FileReader();
                    
        reader.onload = function(e) {
            const previewItem = document.createElement('div');
            previewItem.className = 'bg-gray-100 p-2 rounded flex items-center';
                        
            let previewContent;
            if (file.type.startsWith('image/')) {
                previewContent = `<img src="${e.target.result}" class="w-16 h-16 object-cover rounded mr-3" alt="Previsualización de imagen adjunta" />`;
            } else if (file.type.startsWith('video/')) {
                previewContent = `<div class="w-16 h-16 bg-gray-300 flex items-center justify-center rounded mr-3">
                    <span class="text-gray-500">Video</span>
                </div>`;
            } else {
                previewContent = `<div class="w-16 h-16 bg-gray-300 flex items-center justify-center rounded mr-3">
                    <span class="text-gray-500">PDF</span>
                </div>`;
            }
                        
                previewItem.innerHTML = `
                    ${previewContent}
                    <div>
                        <p class="text-sm font-medium text-gray-800 truncate">${file.name}</p>
                        <p class="text-xs text-gray-500">${(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                `;
                
                previewContainer.appendChild(previewItem);
            };
            
            reader.readAsDataURL(file);
        }
        });
            
        // Form submission
        const denunciaForm = document.getElementById('denunciaForm');
            
        denunciaForm.addEventListener('submit', function(e) {
            e.preventDefault();
                
                // Simulate form submission
            Swal.fire({
                icon: 'success',
                title: '¡Denuncia enviada!',
                text: 'Tu denuncia ambiental ha sido recibida correctamente. Nos pondremos en contacto contigo en breve.',
               confirmButtonColor: '#2c7744'
            }).then(() => {
                denunciaForm.reset();
                previewContainer.classList.add('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
            
            // Show SweetAlert even without the library (simplified version)
        window.Swal = {
            fire: function(options) {
            alert(options.title + "\n" + options.text);
            return Promise.resolve({ isConfirmed: true });
            }
        };
});
let mapa;
let marcador;

function inicializarMapa() {
  const centroInicial = { lat: -25.2637, lng: -57.5759 }; // Centro en Asunción

  mapa = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: centroInicial,
  });

  mapa.addListener("click", (evento) => {
    colocarMarcador(evento.latLng);
  });
}

function colocarMarcador(ubicacion) {
  if (marcador) {
    marcador.setMap(null); // Eliminar marcador anterior
  }

  marcador = new google.maps.Marker({
    position: ubicacion,
    map: mapa,
  });

  // Actualizar inputs ocultos con coordenadas
  document.getElementById("lat").value = ubicacion.lat();
  document.getElementById("lng").value = ubicacion.lng();
}

// (Opcional) Manejo del formulario
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form-denuncia").addEventListener("submit", (e) => {
    e.preventDefault();
    const descripcion = document.getElementById("descripcion").value;
    const lat = document.getElementById("lat").value;
    const lng = document.getElementById("lng").value;

    if (!lat || !lng) {
      alert("Por favor seleccioná una ubicación en el mapa.");
      return;
    }

    console.log("Denuncia enviada:", { descripcion, lat, lng });

    // Acá podrías enviar los datos por fetch() o armar el enlace a WhatsApp/email
    alert("¡Denuncia registrada!");
  });
});




