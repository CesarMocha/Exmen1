import { Component, Input, ViewChild } from '@angular/core';
import { Productos } from '../interface/tienda-d';
import { CommonModule } from '@angular/common';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { TiendaDService } from '../services/tienda-d.service';

@Component({
  selector: 'app-list-tienda',
  standalone: true,
  imports: [CommonModule, ModalEditarComponent],
  templateUrl: './list-tienda.component.html',
  styleUrl: './list-tienda.component.css'
})
export class ListTiendaComponent {
  @Input() productosAll: Productos | undefined
  @ViewChild(ModalEditarComponent) public modal!: ModalEditarComponent

  constructor(private _srvPro:TiendaDService){}

  actualizar(){
    this._srvPro.getProducts().subscribe(pro=>{
      this.productosAll = pro
    })
  }

  eliminar(id:string){
    this._srvPro.deleteProducto(id).subscribe({
      next: ne=>{
        alert('Elemento eliminado')
        this.actualizar()
      }
    })
  }
}
