<script lang="ts">
  import { users, user } from "./user";
  import { Button, Modal, Label, Input, Checkbox} from 'flowbite-svelte'

  let formModal = false;
  let popupModal = false;
  let editModal = false;

  let usuarios = users;
  let usuarioEnEdicion: user = {
      ...user,
      user_id: 0,
      username: "",
      password: "",
      active: true
  };
  let newuser: user = {
      ...user,
      user_id: 0,
      username: "",
      password: "",
      active: true
  };
  function selectorError(num: string,message: string){
    const errorContainer = document.querySelector('.error-container'+num) as HTMLDivElement;
    const errorMessage = document.querySelector('.error-message'+num) as HTMLDivElement;
    if (errorMessage) {
      errorMessage.textContent = message;
    }
    if (errorContainer) {
      errorContainer.style.display = 'block';

      setTimeout(() => {
        errorContainer.style.display = 'none';
      }, 3000); 
    }
  }
  function agregarUsuario(){
    let error = false;
    const existeUsuario = usuarios.some((usuario) => usuario.username === newuser.username);

    if (newuser.username.trim() === "" || newuser.password.trim() === "") {
      selectorError("1","Por favor ingrese un nombre de usuario.");
      error = true;       
    }else{
        if (existeUsuario) {
          selectorError("1","El usuario ya existe en la lista.");
        error = true;
      }
    }
    if (newuser.password.length < 10) {
      selectorError("2","La contraseña debe tener al menos 10 caracteres.");
      error = true;
    }
    if(error){
      return;
    }
    let id = usuarios.length + 1;
    let u = new user(id,newuser.username,newuser.password,true);
    usuarios = [...usuarios, u];
    newuser = {
      ...user,
      user_id: 0,
      username: "",
      password: "",
      active: true
    };
    console.log(users); 
    formModal = false;
   
  }
  function mostrarCuadroEditar(usuario:  user ) {
    usuarioEnEdicion = { ...usuario };
  }  
  function guardarCambiosEdicion() {
    let error = false;
    const existeUsuario = usuarios.some((usuario) => usuario.username === newuser.username);

    if (newuser.username.trim() === "" || newuser.password.trim() === "") {
      selectorError("3","Por favor ingrese un nombre de usuario.");
      error = true;       
    }else{
        if (existeUsuario && newuser.username !== usuarioEnEdicion.username) {
          selectorError("3","El usuario ya existe en la lista.");
        error = true;
      }
    }
    if (newuser.password.length < 10) {
      selectorError("4","La contraseña debe tener al menos 10 caracteres.");
      error = true;
    }
    if(error){
      return;
    }
    const indiceUsuario = usuarioEnEdicion.user_id -1;
      newuser.user_id =usuarioEnEdicion.user_id;
      if (indiceUsuario !== -1) {
      usuarios[indiceUsuario] = { ...newuser};
      }
      editModal = false;
      usuarioEnEdicion = {
        ...user,
        user_id: 0,
        username: "",
        password: "",
        active: true
      };
      newuser = {
      ...user,
      user_id: 0,
      username: "",
      password: "",
      active: true
    };
  }
  function mostrarCuadroConfirmarEliminar(usuario:  user) {
    usuarioEnEdicion = { ...usuario };     
  }
  function confirmarEliminar() {
    usuarios[usuarioEnEdicion.user_id-1].active = false;
    usuarioEnEdicion = {
      ...user,
      user_id: 0,
      username: "",
      password: "",
      active: true
  };
  }
</script>

<main>
  <h1 class="fadeIn">Listado de Usuarios</h1>
  <Button color="blue" on:click={() => { formModal = true }}>Agregar Usuario</Button>
  <br><br>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Usuario</th>
        <th>Contraseña</th>
        <th>Estado</th>
        <th>Opciones</th>
      </tr>
    </thead>
    <tbody>
      {#each usuarios as usuario}
        <tr>
          <td>{usuario.user_id}</td>
          <td>{usuario.username}</td>
          <td>{usuario.password}</td>
          <td>{usuario.active ? "Activo" : "Inactivo"}</td>
          <td class="action-buttons">
            <button class="edit" on:click={() => {mostrarCuadroEditar(usuario); editModal = true; usuarioEnEdicion = usuario}}>Editar</button>
            {#if usuario.active}
              <button class="delete" on:click={() => {popupModal = true; mostrarCuadroConfirmarEliminar(usuario)}}>Eliminar</button>
            {/if}
            {#if !usuario.active}
              <button class="nodelete" >Eliminar</button>
            {/if}
            
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  
  <Modal bind:open={formModal} size="xs" autoclose={false} class="w-full" style="background-color:#5A84F8;color:#A6A5A5">
    <form class="flex flex-col space-y-6" on:submit|preventDefault={agregarUsuario} action="#" novalidate>
      <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Datos para agregar un nuevo usuario</h3>
      <Label class="space-y-2">
        <span>Nombre del neuvo usuario</span>
        <Input type="text" bind:value={newuser.username} placeholder="Ejemplo: jonathan" required/>
      </Label>
      <div class="error-container1" style="display: none">
        <div class="error-message1"></div>
      </div>
      <Label class="space-y-2">
        <span>Contraseñia del nuevo usuario</span>
        <Input type="password" bind:value={newuser.password} placeholder="Ejemplo: jona_12345" minlength="10" required />
      </Label>
      <div class="error-container2" style="display: none">
        <div class="error-message2"></div>
      </div>
      <Button color="blue" type="submit" class="w-full1">Crear Usuario</Button>
    </form>
    
  </Modal>
  
  <Modal bind:open={popupModal} size="xs" autoclose style="background-color:#F86464;color:#A6A5A5" >
    <div class="text-center"  >
      <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Seguro que deseas eliminar el usuario?</h3>
      <Button on:click={confirmarEliminar} color="red" class="mr-2">Sí, estoy seguro</Button>
      <Button  color='alternative'>No, cancelar</Button>
    </div>
  </Modal>

  <Modal bind:open={editModal} size="xs" autoclose={false} class="w-full" style= "background-color:#8AD396;color:#A6A5A5" >
    <form class="flex flex-col space-y-6" on:submit|preventDefault={guardarCambiosEdicion} action="#" novalidate>
      <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Datos del ususario que desea editar</h3>
      <Label class="space-y-2">
        <span>Nombre del usuario a editar</span>
        <Input type="text" bind:value={newuser.username} placeholder={usuarioEnEdicion.username} required />
      </Label>
      <div class="error-container3" style="display: none">
        <div class="error-message3"></div>
      </div>
      <Label class="space-y-2">
        <span>Contraseña del usuario a editar</span>
        <Input type="password" bind:value={newuser.password} placeholder={usuarioEnEdicion.password} minlength="10" required />
      </Label>
      <div class="error-container4" style="display: none">
        <div class="error-message4"></div>
      </div>
      {#if usuarioEnEdicion.active==false}
        <div class="flex items-start">
          <Checkbox bind:checked={newuser.active}>Reactivar usuario</Checkbox>
      </div>
      {/if}
      <Button color="green" type="submit" class="w-full1">Editar Usuario</Button>
    </form>
  </Modal>

 
</main>
<style>
  svg{
    color: #fff;
  }
  
  h3{
    color: #fff;
  }

  main {
    padding: 1rem;
    background-color: #333;
    min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;     
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: #f8f8f8;
    border-radius: 8px;
  } 
  th,
  td {
    border: 1px solid #ccc;
    padding: 0.8rem;
  }

  th {
    background-color: #f2f2f2;
  }

  td {
    text-align: center;
  }

  tr:hover {
    background-color: #f0f0f0;
  }

  .action-buttons {
    display: flex;
    justify-content: space-around;
  }

  .action-buttons button {
    padding: 0.5rem 0.8rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s ease;
  }
  .action-buttons button.nodelete {

    border-radius: 4px;
    cursor: not-allowed;

  }

  .action-buttons button.edit {
    background-color: #4CAF50;
    color: white;
  }

  .action-buttons button.delete {
    background-color: #f44336;
    color: white;
  }
  .action-buttons button.nodelete {
    background-color: #59564E;
    color: white;
  }

  .action-buttons button.edit:hover, .action-buttons button.delete:hover {
    background-color: #37813a;
  }
  .action-buttons button.delete:hover, .action-buttons button.delete:hover {
    background-color: #b33128;
  }
h1 {
  font-size: 2.5rem;
  text-align: center;
  color: #fff; 
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.fadeIn {
  animation: fadeIn 0.8s ease-in-out;
}
.error-container1 ,.error-container2{
position: relative;
animation: fadeIn 0.3s ease;
}

.error-message1, .error-message2 {
  color: #FCA676;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
}
.error-container3 ,.error-container4{
position: relative;
animation: fadeIn 0.3s ease;
}

.error-message3, .error-message4 {
  color: #F56991;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
}

@keyframes slideIn {
from {
  transform: translateX(-50%) translateY(10px);
}
to {
  transform: translateX(-50%) translateY(0);
}
}

@keyframes fadeIn {
from {
  opacity: 0;
  visibility: hidden;
}
to {
  opacity: 1;
  visibility: visible;
}
}

@keyframes fadeOut {
from {
  opacity: 1;
  visibility: visible;
}
to {
  opacity: 0;
  visibility: hidden;
}
}

</style>
