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
        denunciaForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(denunciaForm);

            fetch('/enviar', {
                method: 'POST',
                body: formData
            })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => {
                Swal.fire({
                icon: 'success',
                title: '¡Denuncia enviada!',
                text: data.message || 'Recibida correctamente.',
                confirmButtonColor: '#2c7744'
                }).then(() => {
                denunciaForm.reset();
                previewContainer.classList.add('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            })
            .catch(() => {
                Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un problema al enviar la denuncia.'
                });
            });
        });

        
});

  let map;
  let marcador;

  function inicializarMapa() {
    const centroInicial = { lat: -25.3000, lng: -57.5800 };

    map = new google.maps.Map(document.getElementById("map"), {
      center: centroInicial,
      zoom: 13,
    });

    // Permitir agregar un marcador al hacer clic
    map.addListener("click", function (e) {
      colocarMarcador(e.latLng);
    });
  }

  function colocarMarcador(latLng) {
    if (marcador) {
      marcador.setPosition(latLng);
    } else {
      marcador = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: true,
      });
    }

    // Puedes almacenar las coordenadas en un input oculto si lo necesitas:
    console.log("Latitud:", latLng.lat(), "Longitud:", latLng.lng());
  }

