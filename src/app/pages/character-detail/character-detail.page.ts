import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  // standalone: true,
  // imports: []
})
export class CharacterDetailPage implements OnInit {

  characterId: any = '';
  character: any = null;
  episodes: any [] = [];

  constructor(
    private rickAndMortySvc: RickAndMortyService,
    private actRoute: ActivatedRoute
  ) {
    this.characterId = actRoute.snapshot.paramMap.get('id') as string;
  }
  
  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.getCharacter();
  }
  getCharacter (){
    this.rickAndMortySvc.getCharactersById(this.characterId).subscribe({
      next:(res: any)=>{
        this.character = res;
        this.getEpisodes();
      },
      error: (error: any)=>{
        console.error(error);
      }
    })
  }
  
  getEpisodes (){
    for (let url of this.character.episode) {
      this.rickAndMortySvc.getByUrl(url).subscribe({
        next:(res: any)=>{
          this.episodes.push(res)
        },
        error: (error: any)=>{
          console.error(error);
        }
      })
    }
  }

}
