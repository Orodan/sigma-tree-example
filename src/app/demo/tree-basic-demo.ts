import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { BrochureService } from 'src/service/brochure.service';
import { ThematiqueService } from 'src/service/thematique.service';

@Component({
  selector: 'tree-basic-demo',
  templateUrl: './tree-basic-demo.html',
})
export class TreeBasicDemo implements OnInit {
  thematiques: TreeNode[] = [];
  brochures = []
  selectedBrochure = '';
  selectedThematique: any;

  constructor(
    private brochureService: BrochureService,
    private thematiqueService: ThematiqueService
  ) {}
  

  ngOnInit() {
    this.brochureService.getBrochures().subscribe(brochures => {
      this.brochures = brochures;
    });
  }

  onBrochureChange(brochure) {
    if (brochure) {
      this.thematiqueService.getThematiques(brochure.code).subscribe(thematiquesTree => {
        this.thematiques = thematiquesTree;
      });

      return
    }
    
    // Clean up thematiques si reset de la brochure
    this.thematiques = [];
  }
}
