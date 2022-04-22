import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateConverterService } from 'src/services/date-converter.service';
import { JobServiceService } from 'src/services/job-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-portfolio',
  templateUrl: './job-portfolio.component.html',
  styleUrls: ['./job-portfolio.component.css']
})
export class JobPortfolioComponent implements OnInit {

  jobData!: any[];
  new_job: boolean = false;
  editJob = 0

  constructor(private jobService: JobServiceService, private converter:DateConverterService) { }

  async ngOnInit(): Promise<void> {
    await this.jobService.obtenerDatosJob(parseInt(sessionStorage.getItem("userIdPortfolio") || "no user")).subscribe(data => this.jobData = data)
  }

  jobForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    initial_date: new FormControl(null, Validators.required),
    company: new FormControl(null, Validators.required),
    end_date: new FormControl,
    img: new FormControl,
    about_job: new FormControl(null, [Validators.maxLength(255)])
  });

  editableForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    initial_date: new FormControl(null, [Validators.required]),
    company: new FormControl(null, Validators.required),
    end_date: new FormControl,
    img: new FormControl,
    about_job: new FormControl(null, [Validators.maxLength(255)])
  });

  create() {
    this.new_job = !this.new_job

  }

  async send() {
    let job = {
      title: this.jobForm.get('title')?.value,
      initial_date: this.converter.convert(this.jobForm.get('initial_date')?.value),
      company: this.jobForm.get('company')?.value,
      end_date: this.converter.convert(this.jobForm.get('end_date')?.value),
      img: this.jobForm.get('img')?.value,
      about_job: this.jobForm.get('about_job')?.value,
      idUser: sessionStorage.getItem("userIdPortfolio")
    }
    this.jobService.crearDatosJob(job).subscribe();

    this.jobForm.reset();


    await Swal.fire({
      title: 'Creating and posting ⏳',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    await this.ngOnInit();
    this.new_job = !this.new_job
  }


  edit(id: number, item: any) {
    this.editJob = id
    this.editableForm.setValue({
      title: item.title,
      initial_date: this.converter.undoConvert(item?.initial_date),
      company: item?.company,
      end_date: this.converter.undoConvert(item?.end_date),
      img: item?.img,
      about_job: item?.about_job
    });
  }


  close(){
    this.editJob = 0;
  }

  async update(data: any) {

    let update = {
      idJob: data,
      title: this.editableForm.get('title')?.value,
      initial_date: this.converter.convert(this.editableForm.get('initial_date')?.value),
      company: this.editableForm.get('company')?.value,
      end_date: this.converter.convert(this.editableForm.get('end_date')?.value),
      img: this.editableForm.get('img')?.value,
      about_job: this.editableForm.get('about_job')?.value,
      idUser: sessionStorage.getItem("userIdPortfolio")
    }
    this.jobService.editarDatoJob(update).subscribe()

    await Swal.fire({
      title: 'Updating post... ⏳',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    await this.ngOnInit();
    this.editJob = 0
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
        this.jobData = this.jobData.filter(data => data.idJob != id);
        this.jobService.eliminarDatoJob(id).subscribe()
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }

}
