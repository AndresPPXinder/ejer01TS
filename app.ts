import * as readline from 'readline';

interface Producto {
    nombre: string;
    precio: number;
    stock: number;
    estado: boolean;
}

interface Categoria {
    nombre: string;
    productos: Producto[];
}

interface Tienda {
    id: number;
    nombre: string;
    categorias: Categoria[];
}

const tiendas: Tienda[] = [
    {
        id: 1,
        nombre: "San Juan",
        categorias: [
            {
                nombre: "Electrónica",
                productos: [
                    { nombre: "TV", precio: 1599.99, stock: 10, estado: true },
                    { nombre: "Radio", precio: 49.99, stock: 25, estado: true },
                    { nombre: "Teléfono", precio: 699.99, stock: 15, estado: false },
                ],
            },
            {
                nombre: "Ropa",
                productos: [
                    { nombre: "Camiseta", precio: 19.99, stock: 50, estado: true },
                    { nombre: "Pantalón", precio: 39.99, stock: 30, estado: true },
                    { nombre: "Zapatos", precio: 89.99, stock: 20, estado: false },
                ],
            },
        ],
    },
    {
        id: 2,
        nombre: "Santa Marta",
        categorias: [
            {
                nombre: "Electrónica",
                productos: [
                    { nombre: "TV", precio: 1699.99, stock: 8, estado: true },
                    { nombre: "Radio", precio: 59.99, stock: 20, estado: true },
                    { nombre: "Teléfono", precio: 799.99, stock: 12, estado: true },
                ],
            },
            {
                nombre: "Ropa",
                productos: [
                    { nombre: "Camiseta", precio: 14.99, stock: 60, estado: true },
                    { nombre: "Pantalón", precio: 49.99, stock: 25, estado: false },
                    { nombre: "Zapatos", precio: 99.99, stock: 15, estado: true },
                ],
            },
        ],
    },
];

// Función para mostrar la tabla con todos los productos
function mostrarTiendas(tiendas: Tienda[]): void {
    tiendas.forEach(tienda => {
        console.log(`Tienda: ${tienda.nombre} (ID: ${tienda.id})`);
        tienda.categorias.forEach(categoria => {
            console.log(`  Categoría: ${categoria.nombre}`);
            
            // Mostrar la cabecera de la tabla
            console.log("+------------------+------------+--------+-----------+");
            console.log("| Producto         | Precio     | Stock  | Estado    |");
            console.log("+------------------+------------+--------+-----------+");

            categoria.productos.forEach(producto => {
                // Mostrar los productos de forma tabulada
                console.log(`| ${producto.nombre.padEnd(16)} | ${producto.precio.toFixed(2).padStart(10)} | ${producto.stock.toString().padStart(6)} | ${producto.estado ? "Activo" : "Inactivo"}`);
            });

            console.log("+------------------+------------+--------+-----------+");
        });
    });
}

// Función para buscar un producto por nombre
function buscarProducto(nombre: string): void {
    let encontrado = false;
    tiendas.forEach(tienda => {
        tienda.categorias.forEach(categoria => {
            categoria.productos.forEach(producto => {
                if (producto.nombre.toLowerCase() === nombre.toLowerCase() && producto.estado) {
                    console.log(`Producto encontrado: ${producto.nombre}`);
                    console.log(`  Tienda: ${tienda.nombre}`);
                    console.log(`  Precio: ${producto.precio.toFixed(2)} Pesos`);
                    console.log(`  Stock: ${producto.stock}`);
                    encontrado = true;
                }
            });
        });
    });
    if (!encontrado) {
        console.log("Producto no encontrado o no está disponible.");
    }
}

// Función para mostrar productos de una tienda específica
function mostrarProductosPorTienda(idTienda: number): void {
    const tienda = tiendas.find(tienda => tienda.id === idTienda);
    if (tienda) {
        console.log(`Tienda: ${tienda.nombre}`);
        tienda.categorias.forEach(categoria => {
            console.log(`  Categoría: ${categoria.nombre}`);
            
            // Mostrar la cabecera de la tabla
            console.log("+------------------+------------+--------+-----------+");
            console.log("| Producto         | Precio     | Stock  | Estado    |");
            console.log("+------------------+------------+--------+-----------+");

            categoria.productos.forEach(producto => {
                console.log(`| ${producto.nombre.padEnd(16)} | ${producto.precio.toFixed(2).padStart(10)} | ${producto.stock.toString().padStart(6)} | ${producto.estado ? "Activo" : "Inactivo"}`);
            });

            console.log("+------------------+------------+--------+-----------+");
        });
    } else {
        console.log("Tienda no encontrada.");
    }
}

// Función para mostrar productos de una categoría específica
function mostrarProductosPorCategoria(nombreCategoria: string): void {
    let categoriaEncontrada = false;
    tiendas.forEach(tienda => {
        tienda.categorias.forEach(categoria => {
            if (categoria.nombre.toLowerCase() === nombreCategoria.toLowerCase()) {
                console.log(`Categoría: ${categoria.nombre}`);
                
                // Mostrar la cabecera de la tabla
                console.log("+------------------+------------+--------+-----------+");
                console.log("| Producto         | Precio     | Stock  | Estado    |");
                console.log("+------------------+------------+--------+-----------+");

                categoria.productos.forEach(producto => {
                    console.log(`| ${producto.nombre.padEnd(16)} | ${producto.precio.toFixed(2).padStart(10)} | ${producto.stock.toString().padStart(6)} | ${producto.estado ? "Activo" : "Inactivo"}`);
                });

                console.log("+------------------+------------+--------+-----------+");
                categoriaEncontrada = true;
            }
        });
    });
    if (!categoriaEncontrada) {
        console.log("Categoría no encontrada.");
    }
}

// Configuración de readline para recibir entradas del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para mostrar el menú
function mostrarMenu(): void {
    console.log("+----+-----------------------------------------------+");
    console.log("| #  | Descripción                                   |");
    console.log("+----+-----------------------------------------------+");
    console.log("| 1  | Ver todos los productos de las tiendas       |");
    console.log("| 2  | Ver productos de una tienda                  |");
    console.log("| 3  | Ver productos por categoría (Electrónica o Ropa) |");
    console.log("| 4  | Buscar un producto                           |");
    console.log("| 5  | Salir                                        |");
    console.log("+----+-----------------------------------------------+");
}

// Función principal para manejar el flujo del menú
function iniciarAplicacion(): void {
    mostrarMenu();
    rl.question("Seleccione una opción (1-5): ", (input) => {
        const opcion = parseInt(input);

        switch (opcion) {
            case 1:
                mostrarTiendas(tiendas);
                regresarAlMenu();
                break;
            case 2:
                rl.question("Ingrese el ID de la tienda (1 o 2): ", (idInput) => {
                    const idTienda = parseInt(idInput);
                    mostrarProductosPorTienda(idTienda);
                    regresarAlMenu();
                });
                return;
            case 3:
                rl.question("Ingrese el nombre de la categoría (Electrónica o Ropa): ", (categoriaInput) => {
                    mostrarProductosPorCategoria(categoriaInput);
                    regresarAlMenu();
                });
                return;
            case 4:
                rl.question("Ingrese el nombre del producto a buscar: ", (productoInput) => {
                    buscarProducto(productoInput);
                    regresarAlMenu();
                });
                return;
            case 5:
                console.log("Hasta luego, vuelva pronto.");
                rl.close();
                return;
            default:
                console.log("Opción no válida, intente nuevamente.");
                regresarAlMenu();
                return;
        }
    });
}

// Función para regresar al menú principal
function regresarAlMenu(): void {
    rl.question("¿Desea regresar al menú principal? (s/n): ", (respuesta) => {
        if (respuesta.toLowerCase() === "s") {
            iniciarAplicacion(); // Volver al menú
        } else {
            console.log("Hasta luego, vuelva pronto.");
            rl.close(); // Salir
        }
    });
}

// Iniciar la aplicación
iniciarAplicacion();

