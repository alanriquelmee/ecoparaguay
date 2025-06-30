class Denuncia {
  constructor({ tipo, nombre, email, ubicacion, descripcion }) {
    this.tipo = tipo;
    this.nombre = nombre;
    this.email = email;
    this.ubicacion = this.ubicacion;
    this.descripcion = descripcion;
    this.fecha = new Date();
  }
}

module.exports = Denuncia;
