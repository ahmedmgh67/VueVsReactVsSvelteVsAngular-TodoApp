import { Component } from '@angular/core';
import axios from 'axios'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  data = []
  inputValue = ""
  async ngOnInit() { 
    var req = await axios.get("http://localhost:3131")
    this.data = req.data
  }
  async addTodo(){
    await axios.post("http://localhost:3131", {"name":this.inputValue, "completed":false})
    var req = await axios.get("http://localhost:3131")
    this.data = req.data
  }
  async deleteTodo(id){
    await axios.delete("http://localhost:3131/"+id)
    var req = await axios.get("http://localhost:3131")
    this.data = req.data
  }
  async changeStatus(id, co){
    await axios.patch("http://localhost:3131/"+id, {"completed":!co})
    var req = await axios.get("http://localhost:3131")
    this.data = req.data
  }
}
