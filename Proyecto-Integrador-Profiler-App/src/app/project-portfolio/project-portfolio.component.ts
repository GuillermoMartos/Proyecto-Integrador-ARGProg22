import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectServiceService } from 'src/services/project-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-portfolio',
  templateUrl: './project-portfolio.component.html',
  styleUrls: ['./project-portfolio.component.css']
})
export class ProjectPortfolioComponent implements OnInit {


  projectData!: any[];
  new_project: boolean = false;
  editProject = 0

  constructor(private projectService: ProjectServiceService) { }

  async ngOnInit(): Promise<void> {
    await this.projectService.obtenerDatosProject(parseInt(sessionStorage.getItem("userIdPortfolio") || "no user")).subscribe(data => this.projectData = data)
  }



  projectForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    date: new FormControl(null, Validators.required),
    linkURL: new FormControl(null, Validators.required),
    img: new FormControl,
    about_project: new FormControl,
  });

  editableForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    date: new FormControl(null, Validators.required),
    linkURL: new FormControl(null, Validators.required),
    img: new FormControl,
    about_project: new FormControl,
  });

  create() {
    this.new_project = !this.new_project

  }


  async send() {
    let project = {
      title: this.projectForm.get('title')?.value,
      date: this.projectForm.get('date')?.value,
      linkURL: this.projectForm.get('linkURL')?.value,
      about_project: this.projectForm.get('about_project')?.value,
      img: this.projectForm.get('img')?.value,
      idUser: sessionStorage.getItem("userIdPortfolio")
    }
    this.projectService.crearDatosProject(project).subscribe();

    this.projectForm.reset();


    await Swal.fire({
      title: 'Creating and posting ⏳',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    await this.ngOnInit();
    this.new_project = !this.new_project
  }



  edit(id: number, item: any) {
    this.editProject = id
    this.editableForm.setValue({
      title: item.title,
      date: item?.date,
      linkURL: item?.linkURL,
      about_project: item?.about_project,
      img: item?.img
    });
  }


  close(){
    this.editProject = 0;
  }

  async update(data: any) {
    let update = {
      idProject: data,
      title: this.editableForm.get('title')?.value,
      date: this.editableForm.get('date')?.value,
      linkURL: this.editableForm.get('linkURL')?.value,
      about_project: this.editableForm.get('about_project')?.value,
      img: this.editableForm.get('img')?.value,
      idUser: sessionStorage.getItem("userIdPortfolio")
    }
    this.projectService.editarDatoProject(update).subscribe()

    await Swal.fire({
      title: 'Updating post... ⏳',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    await this.ngOnInit();
    this.editProject = 0
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
        this.projectData = this.projectData.filter(data => data.idProject != id);
        this.projectService.eliminarDatoProject(id).subscribe()
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }
}
