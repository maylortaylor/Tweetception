import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RecipeItem } from './recipes-list/recipe-item/recipe-item.component';
import { RecipesService } from '../../services/recipes.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [RecipesService]
})
export class RecipesComponent implements OnInit {
  recipes: RecipeItem[];
  inBrowser: boolean;



  constructor(
    private readonly recipesService: RecipesService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) { }

  ngOnInit() {
    this.inBrowser = isPlatformBrowser(this.platformId);

    if (this.inBrowser) {
      this.recipesService.getRecipes()
        .then((recipes: RecipeItem[]) => this.recipes = recipes);
    }
  }
}
