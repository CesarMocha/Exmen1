import { Component, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { Product } from '../interface/tienda-d';
import { TiendaDService } from '../services/tienda-d.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-modal-editar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-editar.component.html',
  styleUrl: './modal-editar.component.css'
})
export class ModalEditarComponent {
  @Output() eventAcc = new EventEmitter<Product>()
  @ViewChild('modalElement') public modal!: ElementRef
  private bootstrapModal: any;


  @Input() productoSeleccionado: Product = {
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

  open(product:Product){
    this.productoSeleccionado = product
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

  guardarCambios(){
    if(this.validarCampos()){
      this._srvPro.putProducto(this.productoSeleccionado._id! ,this.productoSeleccionado).subscribe({
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
    const { name, description, price, stock, category } = this.productoSeleccionado;
    return name.trim() !== '' &&
           description.trim() !== '' &&
           price > 0 &&
           stock > 0 &&
           category.trim() !== '';
  }
}
