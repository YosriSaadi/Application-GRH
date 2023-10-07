import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.scss']
})
export class AdministrateurComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.body.setAttribute('data-sidebar', 'dark');
    document.body.removeAttribute('data-layout-size');
    document.body.removeAttribute('data-layout');
    document.body.removeAttribute('data-topbar');
    document.body.classList.remove('auth-body-bg');
  }

}
