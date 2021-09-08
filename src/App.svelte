<script>
import { QuerySnapshot } from '@firebase/firestore';

	import {db} from './firebase'
	import toastr  from 'toastr';
	let tarea = {
		nombre:'',
		descripcion:''
	}
	let Tareas = [];
	let estadoButton = false;
	let idActual;

	db.collection('tareas').onSnapshot(querySnapshot => {
		let docs = [];
		querySnapshot.forEach((doc) => {
			docs.push({...doc.data(), id:doc.id});
		});
		Tareas = [...docs];
	})

	const agregarTarea = async () => {
		await db.collection('tareas').doc().set({
			...tarea, fechacreada:Date.now()
		});
		console.log('Tarea nueva');
	}

	const editarTarea = async() => {
		await db.collection('tareas').doc(idActual).update(tarea);
		toastr.success('Se actualizo la tarea con éxito', {
			timeOut:2000,
			progressBar:true,
			positionClass:'toast-bottom-right'
		});
	}
	
	const handleSubmit = () => {
		
		if(!estadoButton){
			agregarTarea();
		}else{
			editarTarea();
		}

		tarea = {
			nombre:'',
			descripcion:''
		}
	}

	const eliminarTarea = async (id) => {
		 await db.collection('tareas').doc(id).delete();
	}

	const editForm = (tareaActual) => {
		estadoButton = true;
		tarea.nombre = tareaActual.nombre;
		tarea.descripcion = tareaActual.descripcion;
		idActual = tareaActual.id;
	}

	const cancelar = () => {
		estadoButton = false;
		tarea = {nombre:'',descripcion:''};
	}
</script>

<main class="container p-4">

	<div class="row">
		<div class="col-md-4 offset-md-4">
			<form on:submit|preventDefault={handleSubmit} class="card card-body">
				<div class="row">
						<div class="col-md-12 col-lg-12 col-sm-12 mt-2">
							<div class="form-group">
								<input type="text" class="form-control" placeholder="Escribe una tarea" bind:value={tarea.nombre}/>
							</div>
						</div>
					
					
					<div class="col-md-12 col-lg-12 col-sm-12 mt-2">
						<div class="form-group">
							<textarea class="form-control" placeholder="Escriba la descripción de la tarea" rows="3" bind:value={tarea.descripcion}/>
						</div>
					</div>
				</div>
				
				<div class="col-md-12 col-lg-12 col-sm-12 mt-2">
					<div class="form-group">
						<button class="btn btn-primary btn-sm w-100" > {#if estadoButton} Actualizar {:else} Guardar {/if}  </button>
					</div>
				</div>
		
				<div class="col-md-12 col-lg-12 col-sm-12 mt-2">
					{#if estadoButton}
						<button class="btn btn-info btn-sm w-100" on:click={cancelar}> Cancelar </button>
					{/if}
				</div>
		
			</form>
			<!-- Lista -->
			{#each Tareas as tar }
				<div class="card card-body">
					<div class="d-flex justify-content-between">
						<h5>{tar.nombre}</h5>
						<i class="material-icons" style="vertical-align: middle;" on:click={editForm(tar)}>edit</i>
					</div>
					<p>{tar.descripcion}</p>
					<button on:click|preventDefault={eliminarTarea(tar.id)} class="btn btn-danger btn-sm">
						<i class="material-icons" style="vertical-align: middle;">delete_forever</i>
					</button>
				</div>
			{/each }
		</div>
	</div>

	
</main>

<style>

</style>