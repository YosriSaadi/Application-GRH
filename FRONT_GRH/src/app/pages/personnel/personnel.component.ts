import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {
  validationform: FormGroup; // bootstrap validation form
  selectValue: string[];
  sexe: string[];
  isCollapsed: boolean;
 
  constructor(public formBuilder: FormBuilder) { }
 // bread crumb items
 breadCrumbItems: Array<{}>;

 // Form submition
 submit: boolean;
 formsubmit: boolean;
 typesubmit: boolean;
 rangesubmit: boolean;
  ngOnInit(): void { 
    this.breadCrumbItems = [{ label: 'GRH' }, { label: 'Gestion Des Personnels', active: true }];
  
    // Collapse value
    this.isCollapsed = false;
  
    this.sexe=['Homme','Femme'];
    this.selectValue = ['Afghan','Albanais','Algérien','Allemand','Américain','Andorran','Angolais','Antiguan','Argentin','Australien','Autrichien','Azerbaïdjanais','Bahamien','Bahreïn','Bengali','Barbadien','Biélorusse','Belge','Belize','Béninois','Bhoutanais','Bolivien','Bosnie-Herzégovine','Botswanan','Brésilien','Britannique','Bruneian','Bulgare','Burkinabé','Birman','Burundi','Cabo Verdean','Cambodgien','Camerounais','Canadienne','ChilienChinois','Colombien','Comorien','Congolais','Costaricain','Ivoirien','croate','Cubain','Chypriote','Tchèque','Danois','Djiboutien','Dominicain','Emirati','Équatorien','Espagnol','Égyptien','Salvadorien','Équato-guinéenne, équato','Érythrée','Estonien','Éthiopien','Fidjien','Finlandais','Français','gabonais','Gambien','géorgien','Ghanéen','Gibraltar','Grec', 'Grenadian','Guatémaltèque','Guinéenne','Bissau-Guinéen','guyanais','Haïtien','Honduras','Hongrois','Islandais','Indien','Indonesian','Iranien','Jrakien','irlandais','Italien','Ivoirien','Jamaïquain','Japonais','jordanien','Kazakhstani','Kényen','I-Kiribati','Nord coréen','koweïtien','Kirghizistan','laotien','Letton','libanais','Basotho','Libérienne','Libye','Liechtenstein','lituanien','luxembourgeois','Macédonien','Malgache','Malawite','Malaisie','Maldives','Malien','Maltais','Marshall','Martiniquais','Mauritanien','Mauricien','Mexicain','Micronésiens','Moldave','Monacan','Mongol','Monténégrin','Marocain','Mozambique','Namibie','nauruan','Népalais','Néerlandais','Nevisien','nicaraguayen','Nigerien','Marianan du Nord','Norvégien','Oman','Pakistanais','Palauan','Palestinien','Panaméen','Papouasie-Nouvelle-Guinée','Paraguayen','péruvien','Philippin','Polonais','Portugais','portoricain','Qatari','Roumain','Russe','Rwandais','Saint Lucian','Samoan','Saint-Marin','São Toméan','Saoudite','Sénégalais','Serbe','Seychellois','Sierra Leone','Singapourien','Slovaque','Slovène','Îles Salomon','Somali','Sud africain','Soudan du Sud','Sri lankais','Soudanais','Surinamais','Swazi','Suédois','Suisse','Syrien','Tadjikistan','Tanzanien','Tchadien','Thai','Timorais','Togolais','Tokélaouan','Tongan','Trinite-et-Tobago','Tunisien','Turc','Turkmène','Tuvaluan','Ougandais','Ukrainien','Uruguayen','Ouzbékistan','Vanuatuan','Vatican','vénézuélien','Vietnamien','Vincentien','Yéménite','Zambien','Zelanian','Zimbabwéen'];

    /**
     * Bootstrap validation form data
     */
    this.validationform = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      datedenaiss: ['', [Validators.required]],
      lieudenaiss: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      nationnalite: ['', [Validators.required]],
      ncin:['',[Validators.required,Validators.pattern('[0-9]+')]],
      Date: ['', [Validators.required]],
      Lieu: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      adresse: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      ntele:['',[Validators.required,Validators.pattern('[0-9]+')]],
      DateEm: ['', [Validators.required]],
      sexe: ['', [Validators.required]],
      college : ['', [Validators.required]],
      DateEmg : ['', [Validators.required]],
      creditb : ['', [Validators.required]],
      credits : ['', [Validators.required]],
    });
  }
  /**
   * Returns form
   */
   get form() {
    return this.validationform.controls;
  }

  /**
   * Bootsrap validation form submit method
   */
  validSubmit() {
    this.submit = true;
  }

}
