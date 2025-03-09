"use client";
import { useState } from "react";

export default function Home() {
  const [productos, setProductos] = useState([
    { sku: "ABC123", nombre: "Producto de ejemplo", precio: 50, costo: 30, cantidad: 10 },
  ]);

  const [form, setForm] = useState({
    sku: "",
    nombre: "",
    precio: "",
    costo: "",
    cantidad: "",
  });

  // Estado de visibilidad de columnas (se agregaron las nuevas columnas)
  const [visibilidad, setVisibilidad] = useState({
    sku: true,
    nombre: true,
    precio: true,
    costo: true,
    cantidad: true,
    valorStock: true,
    utilidad: true,
    unidadesVendidas: true,
    montoVendido: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const agregarProducto = () => {
    if (!form.sku || !form.nombre || !form.precio || !form.costo || !form.cantidad) {
      alert("Completa todos los campos");
      return;
    }

    const nuevoProducto = {
      sku: form.sku,
      nombre: form.nombre,
      precio: parseFloat(form.precio),
      costo: parseFloat(form.costo),
      cantidad: parseInt(form.cantidad),
    };

    setProductos([...productos, nuevoProducto]);

    setForm({
      sku: "",
      nombre: "",
      precio: "",
      costo: "",
      cantidad: "",
    });
  };

  const copiarCSV = () => {
    if (productos.length === 0) {
      alert("No hay productos para exportar.");
      return;
    }

    const encabezados = [
      "SKU", "Nombre", "Precio", "Costo", "Cantidad",
      "Valor Stock", "Utilidad", "Unidades Vendidas", "Monto Vendido"
    ];

    const filas = productos.map(producto => [
      producto.sku,
      producto.nombre,
      producto.precio,
      producto.costo,
      producto.cantidad,
      Math.round(producto.costo * producto.cantidad),
      Math.round((producto.precio - producto.costo) * producto.cantidad),
      producto.cantidad,
      Math.round(producto.precio * producto.cantidad),
    ]);

    const csvContent = [encabezados, ...filas]
      .map(e => e.join(","))
      .join("\n");

    navigator.clipboard.writeText(csvContent)
      .then(() => {
        alert("Información copiada al portapapeles en formato CSV ✅");
      })
      .catch(() => {
        alert("Error al copiar al portapapeles ❌");
      });
  };

  // Función para cambiar la visibilidad de columnas
  const toggleColumna = (col: keyof typeof visibilidad) => {
    setVisibilidad({ ...visibilidad, [col]: !visibilidad[col] });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center font-sans">
      <h1 className="text-3xl font-bold mb-8">Inventario</h1>

      {/* Formulario para agregar producto */}
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Agregar Producto</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={form.sku}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del producto"
            value={form.nombre}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio de venta"
            value={form.precio}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            name="costo"
            placeholder="Costo"
            value={form.costo}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            value={form.cantidad}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <button
            onClick={agregarProducto}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            Agregar Producto
          </button>
        </div>
      </div>

      {/* Controles para mostrar/ocultar columnas */}
      <div className="bg-white shadow-md rounded p-6 w-full max-w-4xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Mostrar/Ocultar Columnas</h2>
        <div className="flex flex-wrap gap-4">
          {Object.keys(visibilidad).map((col) => (
            <label key={col} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={visibilidad[col as keyof typeof visibilidad]}
                onChange={() => toggleColumna(col as keyof typeof visibilidad)}
              />
              {col.charAt(0).toUpperCase() + col.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Botón para copiar CSV */}
      <div className="w-full max-w-4xl mb-4">
        <button
          onClick={copiarCSV}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mb-6"
        >
          Copiar Inventario en CSV
        </button>
      </div>

      {/* Tabla de productos */}
      <div className="w-full max-w-6xl">
        <h2 className="text-xl font-semibold mb-4">Lista de Productos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                {visibilidad.sku && <th className="py-3 px-6 text-left">SKU</th>}
                {visibilidad.nombre && <th className="py-3 px-6 text-left">Nombre</th>}
                {visibilidad.precio && <th className="py-3 px-6 text-center">Precio</th>}
                {visibilidad.costo && <th className="py-3 px-6 text-center">Costo</th>}
                {visibilidad.cantidad && <th className="py-3 px-6 text-center">Cantidad</th>}
                {visibilidad.valorStock && <th className="py-3 px-6 text-center">Valor Stock</th>}
                {visibilidad.utilidad && <th className="py-3 px-6 text-center">Utilidad</th>}
                {visibilidad.unidadesVendidas && <th className="py-3 px-6 text-center">Unidades Vendidas</th>}
                {visibilidad.montoVendido && <th className="py-3 px-6 text-center">Monto Vendido</th>}
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {productos.map((producto, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  {visibilidad.sku && <td className="py-3 px-6 text-left">{producto.sku}</td>}
                  {visibilidad.nombre && <td className="py-3 px-6 text-left">{producto.nombre}</td>}
                  {visibilidad.precio && <td className="py-3 px-6 text-center">${producto.precio}</td>}
                  {visibilidad.costo && <td className="py-3 px-6 text-center">${producto.costo}</td>}
                  {visibilidad.cantidad && <td className="py-3 px-6 text-center">{producto.cantidad}</td>}
                  {visibilidad.valorStock && (
                    <td className="py-3 px-6 text-center">
                      ${Math.round(producto.costo * producto.cantidad)}
                    </td>
                  )}
                  {visibilidad.utilidad && (
                    <td className="py-3 px-6 text-center">
                      ${Math.round((producto.precio - producto.costo) * producto.cantidad)}
                    </td>
                  )}
                  {visibilidad.unidadesVendidas && (
                    <td className="py-3 px-6 text-center">
                      {producto.cantidad}
                    </td>
                  )}
                  {visibilidad.montoVendido && (
                    <td className="py-3 px-6 text-center">
                      ${Math.round(producto.precio * producto.cantidad)}
                    </td>
                  )}
                </tr>
              ))}
              {productos.length === 0 && (
                <tr>
                  <td colSpan={Object.values(visibilidad).filter(Boolean).length} className="py-4 text-center text-gray-500">
                    No hay productos en el inventario.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}