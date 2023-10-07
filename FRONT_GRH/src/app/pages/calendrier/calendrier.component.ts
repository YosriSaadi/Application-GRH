import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import{calendrierservice} from './calendrier.service';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { EventInput } from '@fullcalendar/core';
import { Event ,calendrier} from './event.model';
import { registerLocaleData } from '@angular/common';
import frLocale from '@fullcalendar/core/locales/fr';
import esLocale from '@fullcalendar/core/locales/en-au'; 
import { category,calendarEvents } from './data';
import * as moment from 'moment';

import { ShiftService } from '../législation/shifts/shift.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {
  locales = [frLocale, esLocale];
 // bread crumb items
 breadCrumbItems: Array<{}>;
shift:[];
shift_id:any;
 // event form
 formData: FormGroup;
 formEditData: FormGroup;

 // Form submition value
 submitted: boolean;

 // Form category data
 category: Event[];

 // Date added in event
 newEventDate: Date;

 // Edit event
 editEvent: EventInput;

 // Delete event
 deleteEvent: EventInput;

 calendarWeekends: any;
 // show events
 calendarEvents: EventInput[];

 // calendar plugin
 calendarPlugins = [dayGridPlugin, bootstrapPlugin, timeGrigPlugin, interactionPlugin, listPlugin];
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,private service:calendrierservice,private auth:AuthfakeauthenticationService,public shiftservice : ShiftService) { 
    this.getshift();
   
  }
 

  ngOnInit(): void {
  
     this.breadCrumbItems = [{ label: 'GRH' }, { label: 'Les jours fériés', active: true }];
     /**
     * Event Model validation
     */
    this.formData = this.formBuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });

    /**
     * Edit Event Model Data
     */
    this.formEditData = this.formBuilder.group({
      title: [],
      className: [],
    });
  
    this._fetchData();

  }
  
  /**
   * Returns form
   */
   get form() {
    return this.formData.controls;
  }

  /**
   * Open Event Modal
   * @param content modal content
   * @param event calendar event
   */
  openModal(content: any, event: any) {
    this.newEventDate = event.date;
    this.modalService.open(content);
  }

  /**
   * Open Event Modal For Edit
   * @param editcontent modal content
   * @param event calendar event
   */
  openEditModal(editcontent: any, event: any) {
    this.formEditData = this.formBuilder.group({
      title: event.event.title,
      className: event.event.classNames[event.event.classNames.length - 1],
    });
    // tslint:disable-next-line: max-line-length
    this.editEvent = { id: event.event.id, title: event.event.title, start: event.event.start, classNames: event.event.classNames[event.event.classNames.length - 1] };
    this.modalService.open(editcontent);
  }

  /**
   * Show successfull Save Dialog
   */
  position() {
    Swal.fire({
      icon: 'success',
      title: 'Ajouté avec succès ',
      showConfirmButton: false,
      timer: 1500
    });
  }

  /**
   * Upldated event title save in calendar
   */
  editEventSave() {
    const editTitle = this.formEditData.get('title').value;
    const editCategory = this.formEditData.get('className').value;
    const editId = this.calendarEvents.findIndex(x => x.id + '' === this.editEvent.id + '');
    // tslint:disable-next-line: radix
   this.service.updatecalendrier(this.formEditData.value,this.editEvent.id).subscribe(response=>{
     this._fetchData()
     console.log(this.editEvent.id)
    })
    Swal.fire({
      icon: 'success',
      title: 'Modification Réussite',
      showConfirmButton: false,
      timer: 1500
    });
    //this.calendarEvents[editId] = { ...this.editEvent, title: editTitle, id: parseInt(this.editEvent.id + ''), className: editCategory };
    this.formEditData = this.formBuilder.group({
      editTitle: '',
      editCategory: '',
    });
    this.modalService.dismissAll();
  }

  /**
   * Delete the event from calendar
   */
  deleteEventData() {
    const deleteId = this.editEvent.id;
    this.service.deletecalendrier(this.editEvent.id).subscribe(response=>{ 
      this._fetchData();
    })
    /*const deleteEvent = this.calendarEvents.findIndex(x => x.id + '' === deleteId + '');
    this.calendarEvents[deleteEvent] = { ...this.deleteEvent, id: '' };
    delete this.calendarEvents[deleteEvent].id;*/
    this.modalService.dismissAll();
  }

  /**
   * Model Data save and show the event in calendar
   */
  saveEvent() {
    var calendrier:Array<calendrier> = [];
    if (this.formData.valid) {
      const title = this.formData.get('title').value;
      // tslint:disable-next-line: no-shadowed-variable
      const category = this.formData.get('category').value;
      const date=moment(this.newEventDate || new Date()).format('YYYY-MM-DD')
      calendrier.push({title:this.formData.get('title').value,start:date,className:this.formData.get('category').value,id_shift:this.shift_id})
    
      this.service.addcalendrier(calendrier[0]).subscribe(response=>{   
      this._fetchData()
      this.position();
    })
      

      this.formData = this.formBuilder.group({
        title: '',
        category: ''
      });

      this.modalService.dismissAll();
    }
    this.submitted = true;
  }

  /**
   * Open Delete Confirmation Modal
   */
  confirm() {
    Swal.fire({
      title: 'Confirmation de suppression?',
        text: 'êtes-vous sûr de vouloir supprimer ce jour!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#ff3d60',
        confirmButtonText: 'Oui, Supprimer!'
    }).then(result => {
      if (result.value) {
        this.deleteEventData();
        Swal.fire('la suppression est effectuée!', 'Jour  Supprimé.', 'success');
      }
    });
  }

  private _fetchData() {
    //apiGet
    this.service.Getcalendrier(this.shift_id).subscribe(response=>{ 
      this.calendarEvents = response;
    })
    // Event category
    this.category = category;
    // Calender Event Data
    

    // form submit
    this.submitted = false;
  }

  closeEventModal() {
    const title = this.formData.get('title').value;
    // tslint:disable-next-line: no-shadowed-variable
    const category = this.formData.get('category').value;
    this.formData = this.formBuilder.group({
      title: '',
      category: ''
    });
    this.modalService.dismissAll();
  }

  getshift(){

    this.shiftservice.Getshift(this.auth.currentUserValue.societe_id).subscribe((data:any) => {
    this.shift=data;
    this.shift_id=data[length].code;
    console.log(this.shift_id)
    this._fetchData();
    });
  
  }
  change_shift(){
    this.shift_id=(<HTMLInputElement>document.getElementById("shift")).value;
    this._fetchData();
  }

}
