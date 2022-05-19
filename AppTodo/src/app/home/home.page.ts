import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { identity } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
tarefas: any[] = [];
  todoService: any;
  http: any;
 
constructor(private alertCrtl: AlertController,
  private toastCtrl: ToastController,
  private actionSheetCrtl: ActionSheetController,
  private todoService: TodoService) {

    this.carregarTarefa();

  
const tarefa = { nome: novaTarefa, realizada: 0 };
//
this.tarefas.push(tarefa);
this.todoService.adicionaTarefa(tarefa.nome, tarefa.realizada )
  .then( async(resposta)=>{
    const toast = await this.toastCtrl.create({
      message: 'Operação Realizada com Sucesso',
      duration: 2000,
      position: 'top'
    });
    toast.present();

  })
  .catch(async(erro)=>{
    const toast = await this.toastCtrl.create({
      message: 'Erro ao realizar operação',
      duration: 2000,
      position: 'top'
    });
    toast.present();  });

}
  carregarTarefa() {
    this.todoService.listaTarefa()
      .then( async(resposta: any[])=>{
        console.table(resposta);
        this.tarefas =resposta;
      })
      .catch(async(erro)=>{
        const toast =await this.toastCtrl.create({
          message: 'Erro ao realizar operação',
          duration: 2000,
          position: 'top'
        });
        toast.present();  });

   }

salvaLocalStorage(){
  localStorage.setItem('tarefaUsuario', JSON.stringify(this.tarefas));
}
  excluirTarefa(id: any){
    const url = 'http://localhost/Api.php?id='+id;

    return this.http.delete(url).toPromise();
  }

}