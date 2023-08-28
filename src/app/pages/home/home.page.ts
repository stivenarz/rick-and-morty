import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { RickAndMortyService } from './../../services/rick-and-morty.service';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class HomePage implements OnInit {

  characters: any[] = [];
  params = {} as any;

  constructor(
    private rickAndMortySvc: RickAndMortyService
    ) { }

  ngOnInit() {
    this.params.page = 0;
    this.getCharacters();
  }

  getCharacters (event?: any){
    this.params.page ++;
    this.rickAndMortySvc.getCharacters(this.params).subscribe({
      next:(res: any)=>{
        this.characters.push(...res.results)
        if(event) event.target.complete();
        // console.log(this.characters)
      },
      error: (error: any)=>{
        if(event) event.target.complete();
      }
    })
  }

  searchCharacters (){
    this.params.page = 1;
    this.rickAndMortySvc.getCharacters(this.params).subscribe({
      next:(res: any)=>{
        this.characters = res.results
        console.log(this.characters)
      },
      error: (error: any)=>{
        console.error(error)

      }
    })
  }
}
