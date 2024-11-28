import { Component, OnInit, ViewChild } from '@angular/core';
import { Productos } from './interface/tienda-d';
import { TiendaDService } from './services/tienda-d.service';
import { ListTiendaComponent } from "./list-tienda/list-tienda.component";
import { ModalAgregarComponent } from "./modal-agregar/modal-agregar.component";

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [ListTiendaComponent, ModalAgregarComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit{
  productos: Productos | undefined
  @ViewChild(ModalAgregarComponent) public modal!: ModalAgregarComponent
  constructor(private _srvPro:TiendaDService){}

  ngOnInit(): void {
    this._srvPro.getProducts().subscribe(pro => {
      this.productos = pro
    })
  }

  atualizar(){
    this._srvPro.getProducts().subscribe(pro => {
      this.productos = pro
    })
  }
}
