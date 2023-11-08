import { of } from 'rxjs';
import thematiques from '../data/thematiques.json';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThematiqueService {
  getThematiques(brochureId: number) {
    const matchingThematiques = thematiques.filter(thematique => thematique.idThematique === brochureId);
    const thematiqueTree = this.generateThematiquesTree(matchingThematiques);

    return of(thematiqueTree);
  }

  generateThematiquesTree(matchingThematiques: any[]) {
    const thematiqueTree = []

    matchingThematiques.forEach((thematique) => {
      if (thematique.idNiveauThematiqueSuperieur === null) {
        // Parent
        thematiqueTree.push({
          key: thematique.id,
          label: thematique.libelle,
          niveau: thematique.niveau,
          children: []
        });

        return;
      }

      // Enfant
      const parentId = thematique.idNiveauThematiqueSuperieur;

      // Trouve son parent
      const parent = this.findParentNode(
        thematiqueTree,
        parentId,
        thematique.niveau
      );

      if (parent) {
        // L'ajoute aux children de son parent
        parent.children.push({
          key: thematique.id,
          label: thematique.libelle,
          children: [],
          niveau: thematique.niveau,
        });
      }
    });

    return thematiqueTree
  }

  private findParentNode(nodes: any[], parentId: number, niveauEnfant: number) {
    let parent;
    let i = 0;
    let indexLimit = nodes.length;

    while (!parent && i < indexLimit) {
      const node = nodes[i];

      if (node.niveau < niveauEnfant - 1) {
        parent = this.findParentNode(node.children, parentId, niveauEnfant);
      }
    
      if (node.niveau === niveauEnfant - 1 && node.key === parentId) {
        parent = node;
      }

      i++;
    }

    return parent;
  }
}
