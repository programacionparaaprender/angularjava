import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppState } from 'src/app/commons/store/app.state';
import * as TaskActions from 'src/app/commons/store/login.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tio } from 'src/app/commons/models/tio';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUsuariosComponent } from 'src/app/views/tio/login-usuarios/login-usuarios.component';
import { Location } from "@angular/common";
import { TokenService } from 'src/app/services/token.service';
import { Usertoken } from 'src/app/models/usertoken';
import { MenuService } from 'src/app/services/menu.service';
import { ResponseMenu } from 'src/app/models/responsemenu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})


export class SidebarComponent implements OnInit {
  menusAngular:ResponseMenu[] = [];
  nombre = '';
  email = 'zddfdfdsfd';
  password = '';
  usuariologeado = false;
  constructor(
    location: Location, 
    private router: Router, 
    //private store: Store<AppState>,
    private menuService: MenuService,
    private tokenService: TokenService) {
  }
  
  async ngOnInit() {
    const response = await this.menuService.lista(); 
    if(response){
      this.menusAngular = response.data;
      this.menuService.setMenusArray(this.menusAngular);
    }else {
      console.log('no esta autorizado');
    }
  }

  get menus() {
    const menuString:string = this.menuService.getMenusArray();
    let MenusArray:ResponseMenu[] = []
    if(menuString.length > 0){
      MenusArray = JSON.parse(menuString);
    }
    return MenusArray;
  }

  onClick(nombre:string): void {
    const item:any = document.getElementById(nombre);
    console.log("item");
    console.log(item);
    const subMenus = document.querySelectorAll(".sub-menu"),
    buttons = document.querySelectorAll(".sidebar ul button");
    subMenus.forEach((menu:any) => (menu.style.height = "0px"));
    buttons.forEach((button) => button.classList.remove("active"));
  
    if (!item.nextElementSibling) {
      item.classList.add("active");
      return;
    }
  
    const subMenu = item.nextElementSibling,
      ul = subMenu.querySelector("ul");
  
    if (!subMenu.clientHeight) {
      subMenu.style.height = `${ul.clientHeight}px`;
      item.classList.add("active");
    } else {
      subMenu.style.height = "0px";
      item.classList.remove("active");
    }
  }

  toggleSidebar():void{
    var aside1 = document.getElementById("aside1");
    var elementos:any = document.getElementsByClassName("etexto");
    if(aside1 != null){
      var lista = aside1.classList;
      if(lista.contains("aside1")){
        aside1.classList.remove("aside1");
        for(let e of elementos){
          e.classList.remove("quitar");
        }
      } else {
        aside1.classList.add("aside1");
        for(let e of elementos){
          e.classList.add("quitar");
        }
      }
    }
    
    
  }
  
}
