import { Component, ElementRef, EventEmitter, Inject, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { Product } from '../interface/tienda-d';
import { TiendaDService } from '../services/tienda-d.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-modal-agregar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-agregar.component.html',
  styleUrl: './modal-agregar.component.css'
})
export class ModalAgregarComponent {
  @Output() eventAcc = new EventEmitter<Product>()
  @ViewChild('modalElement') public modal!: ElementRef
  private bootstrapModal: any;


  nuevoProducto: Product = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    createdAt: new Date()
  };

  constructor(private _srvPro:TiendaDService,
    @Inject(PLATFORM_ID) private plataformID:object
  ){}

  ngAfterViewInit(){
    if(isPlatformBrowser(this.plataformID)){
      this.inicializarModal()
    }
  }

  inicializarModal(){
    import('bootstrap').then(bootstrap =>{
      this.bootstrapModal = new bootstrap.Modal(this.modal.nativeElement)
    })
  }

  open(){
    if(isPlatformBrowser(this.plataformID)){
      if(this.bootstrapModal){
        this.bootstrapModal.show()
      }else{
        this.inicializarModal()
        setTimeout(()=>{
          this.bootstrapModal.show();
        }, 0)
      }
    }
  }

  close() {
    if (isPlatformBrowser(this.plataformID)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.hide(); // Cierra el modal
      } else {
        console.warn('El modal no está inicializado.');
      }
    }
  }

  agregarProducto(){
    if(this.validarCampos()){
      this._srvPro.postProducto(this.nuevoProducto).subscribe({
        next: next => {
          this.eventAcc.emit()
          this.close()
        }
      })
    }else{
      alert('Debe llenar todos los campos')
    }
  }

  validarCampos(): boolean {
    const { name, description, price, stock, category } = this.nuevoProducto;
    return name.trim() !== '' &&
           description.trim() !== '' &&
           price > 0 &&
           stock > 0 &&
           category.trim() !== '';
  }
}
