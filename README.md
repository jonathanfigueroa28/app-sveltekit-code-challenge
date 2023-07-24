# Code challenge 🚀

Nuestro code challenge consiste en una prueba sencilla para conocerte mejor como ingeniero de software 😀.

**Nota:** No olvidar que la forma correcta de subir tu solución es creando un Fork de este repo y enviando un Pull Request.
Al final hay una breve guía para envíar tu solución.

-   [Problema](#problema)
-   [Tech Stack](#tech_stack)
-   [Opcional](#opcional)
-   [Envía tu solucion](#solucion)

# Problema
Se quiere gestionar a los usuarios de un sistema, tu solución debe permitir
que un administrador pueda **Agregar**, **Listar**, **Editar** y **Eliminar** usuarios.

Para fines de este caso basta con persistir a los usuarios en local storage o en memoria.
La eliminación debe ser lógica, solo se debe modificar un booleano para indicar el estado
del registro (true = Activo, false = Inactivo).

**Ejemplos de usuarios**: 

```json
{
    "user_id": 1,
    "username": "SunTzu",
    "password": "123456",
    "active": true
}
```

```json
{
    "user_id": 2,
    "username": "Kaizen",
    "password": "123456",
    "active": false
}
```

# TechStack

<ol>
  <li>SvelteKit</li> 
</ol>

# Opcional


<ol>
  <li>Validación de formulario al momento de agregar / editar
usuarios. Por ejemplo: username requerido / password requerido + longitud mínima 10 caracteres.</li>
  <li>Mostrar errores personalizados (crear un componente Error con animaciones)</li>
</ol>

# Solución

