import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SkillServiceService } from 'src/services/skill-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skill-portfolio',
  templateUrl: './skill-portfolio.component.html',
  styleUrls: ['./skill-portfolio.component.css']
})
export class SkillPortfolioComponent implements OnInit {

  skillData!: any[];
  new_skill: boolean = false;
  editSkill = 0

  constructor( private skillService: SkillServiceService) { }

  async ngOnInit(): Promise<void> {
    await this.skillService.obtenerDatosSkill(parseInt(sessionStorage.getItem("userIdPortfolio") || "no user")).subscribe(data => this.skillData = data)
  }

  skillForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    qualification: new FormControl,
    type: new FormControl,
    about_skill: new FormControl,
  });

  editableForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    qualification: new FormControl,
    type: new FormControl,
    about_skill: new FormControl,
  });

  create() {
    this.new_skill = !this.new_skill

  }

  async send() {
    let skill = {
      title: this.skillForm.get('title')?.value,
      qualification: this.skillForm.get('qualification')?.value,
      type: this.skillForm.get('type')?.value,
      about_skill: this.skillForm.get('about_skill')?.value,
      idUser: parseInt(sessionStorage.getItem("userIdPortfolio")||"no user")
    }

    this.skillService.crearDatosSkill(skill).subscribe();

    this.skillForm.reset();


    await Swal.fire({
      title: 'Creating and posting ⏳',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    await this.ngOnInit();
    this.new_skill = !this.new_skill
  }


  edit(id: number, item: any) {
    this.editSkill = id
    this.editableForm.setValue({
      title: item.title,
      qualification: item.qualification,
      type: item?.type,
      about_skill: item?.about_skill
    });
  }

  close(){
    this.editSkill = 0;
  }

  async update(data: any) {
   
    let update = {
      idSkill: data,      
      title: this.editableForm.get('title')?.value,
      qualification: this.editableForm.get('qualification')?.value,
      type: this.editableForm.get('type')?.value,
      about_skill: this.editableForm.get('about_skill')?.value,
      idUser: sessionStorage.getItem("userIdPortfolio")
    }
    console.log(update)
    this.skillService.editarDatoSkill(update).subscribe()

    await Swal.fire({
      title: 'Updating post... ⏳',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    await this.ngOnInit();
    this.editSkill = 0
  }

  erase(id: number) {
    console.log(id)
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
        this.skillData = this.skillData.filter(data => data.idSkill != id);
        this.skillService.eliminarDatoSkill(id).subscribe()
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }
}
