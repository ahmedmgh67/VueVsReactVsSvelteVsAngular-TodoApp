<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <center>
      <div class="todo-item">
        <label for="">New Todo</label>
        <br />
        <input v-model="newTodoValue" type="text" />
        <br />
        <br />
        <button v-on:click.stop="addTodo()">Add Todo</button>
        <br />
        <br />
      </div>
      <div class="todo-item" v-for="todo in todos" :key="todo.id">
        <h3>{{ todo.name }}</h3>
        <h6>{{ todo.completed === false ? "Not completed":"Completed " }}</h6>
        <button v-on:click.stop="deleteTodo(todo.id)">Delete Todo</button>
        <button v-on:click.stop="changeStatus(todo.id, todo.completed )">Change Status</button>
      </div>
    </center>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      todos: [],
      newTodoValue: null,
    };
  },
  async mounted() {
    var req = await axios.get("http://localhost:3131");
    this.todos = req.data;
  },
  methods: {
    async addTodo() {
      await axios.post("http://localhost:3131", {
        name: this.newTodoValue,
        completed: false,
      });
      var req = await axios.get("http://localhost:3131");
      this.todos = req.data;
    },
    async deleteTodo(id){
      await axios.delete("http://localhost:3131/"+id)

      var req = await axios.get("http://localhost:3131");
      this.todos = req.data;
    },
    async changeStatus(id, completed){
      await axios.patch("http://localhost:3131/"+id, {"completed":!completed})

      var req = await axios.get("http://localhost:3131");
      this.todos = req.data;
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.todo-item {
  border: solid black 1pt;
  max-width: 20%;
  margin-bottom: 10px;
}
</style>
