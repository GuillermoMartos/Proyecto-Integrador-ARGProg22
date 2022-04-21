import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateConverterService } from 'src/services/date-converter.service';
import { EducationServiceService } from 'src/services/education-service.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-education-portfolio',
  templateUrl: './education-portfolio.component.html',
  styleUrls: ['./education-portfolio.component.css']
})
export class EducationPortfolioComponent implements OnInit {
  eduData!: any[];
  new_edu: boolean = false;
  editEducation = 0

  constructor(private eduService: EducationServiceService, private converter:DateConverterService) { }

  async ngOnInit(): Promise<void> {
    await this.eduService.obtenerDatosEducacion(parseInt(sessionStorage.getItem("userIdPortfolio") || "no user")).subscribe(data => this.eduData = data)
  }

  educationForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    date_initial: new FormControl(null, Validators.required),
    date_end: new FormControl,
    img_institution: new FormControl,
    institution: new FormControl,
    about: new FormControl,
  });

  editableForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    date_initial: new FormControl(null, Validators.required),
    date_end: new FormControl,
    img_institution: new FormControl,
    institution: new FormControl,
    about: new FormControl,
  });

  create() {
    this.new_edu = !this.new_edu
  }


  async send() {
    let education = {
      title: this.educationForm.get('title')?.value,
      date_initial: this.converter.convert(this.educationForm.get('date_initial')?.value),
      date_end: this.converter.convert(this.educationForm.get('date_end')?.value),
      img_institution: this.educationForm.get('img_institution')?.value,
      institution: this.educationForm.get('institution')?.value,
      about: this.educationForm.get('about')?.value,
      idUser: sessionStorage.getItem("userIdPortfolio")
    }
    this.eduService.crearDatosEducacion(education).subscribe();

    this.educationForm.reset();


    await Swal.fire({
      title: 'Creating and posting ⏳',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    await this.ngOnInit();
    this.new_edu = !this.new_edu
  }


  edit(id: number, item: any) {
    this.editEducation = id
    this.editableForm.setValue({
      title: item.title,
      date_initial: this.converter.undoConvert(item?.date_initial),
      date_end: this.converter.undoConvert(item?.date_end),
      img_institution: item?.img_institution,
      institution: item?.institution,
      about: item?.about
    });
  }

  close(){
    this.editEducation = 0;
  }

  async update(data: any) {

    let update = {
      idEducation: data,
      title: this.editableForm.get('title')?.value,
      date_initial: this.converter.convert(this.editableForm.get('date_initial')?.value),
      date_end: this.converter.convert(this.editableForm.get('date_end')?.value),
      img_institution: this.editableForm.get('img_institution')?.value,
      institution: this.editableForm.get('institution')?.value,
      about: this.editableForm.get('about')?.value,
      idUser: sessionStorage.getItem("userIdPortfolio")
    }
    this.eduService.editarDatoEducacion(update).subscribe()

    await Swal.fire({
      title: 'Updating post... ⏳',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    await this.ngOnInit();
    this.editEducation = 0
  }

  erase(id: number) {
    if (id === undefined) {
      Swal.fire("must restart login to delete new info")
      return
    }
    Swal.fire({
      title: 'Are you sure to delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eduData = this.eduData.filter(data => data.idEducation != id);
        this.eduService.eliminarDatoEducacion(id).subscribe()
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }

}
