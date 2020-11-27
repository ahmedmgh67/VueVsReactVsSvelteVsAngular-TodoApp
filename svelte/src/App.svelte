<script>
	import { onMount } from "svelte";
	import axios from "axios";
	export let name;
	let inputValue = "";

	let todos = [];

	onMount(async () => {
		const res = await axios.get("http://localhost:3131/");
		todos = res.data;
	});

	async function addTodo() {
		axios.post("http://localhost:3131/", {"name":inputValue, "completed": false})
		const res = await axios.get("http://localhost:3131/");
		todos = res.data;
	};
	async function deleteTodo(id) {
		axios.delete("http://localhost:3131/"+id)
		const res = await axios.get("http://localhost:3131/");
		todos = res.data;
	};
	async function changeStatus(id, completed) {
		axios.patch("http://localhost:3131/"+id, {"completed":!completed})
		const res = await axios.get("http://localhost:3131/");
		todos = res.data;
	};
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>
		Visit the
		<a href="https://svelte.dev/tutorial">Svelte tutorial</a>
		to learn how to build Svelte apps.
	</p>
	<center>
		<div class="todo-item">
			<label for="">New Todo</label>
			<br />
			<input bind:value={inputValue} type="text" />
			<br />
			<br />
			<button on:click={addTodo}>Add Todo</button>
			<br />
			<br />
		</div>
		{#each todos as todo}
			<div class="todo-item" v-for="todo in todos" :key="todo.id">
				<h3>{todo.name}</h3>
				<h6>{todo.completed === false ? 'Not completed' : 'Completed '}</h6>
				<button on:click={()=> deleteTodo(todo.id)}>Delete Todo</button>
				<button on:click={()=> changeStatus(todo.id, todo.completed)}>Change Status</button>
			</div>
		{/each}
	</center>
</main>


<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	.todo-item {
		border: solid black 1pt;
		max-width: 20%;
		margin-bottom: 10px;
	}
</style>

