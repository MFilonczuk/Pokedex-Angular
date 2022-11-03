import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { PokemonColorService } from '../services/pokemon-color.service';

@Directive({
  selector: '[colorType]',
})
export class ColorDirective implements AfterViewInit {
  // @ts-ignore
  @Input() colorType: string;

  constructor(
    private element: ElementRef,
    private pokemonColorService: PokemonColorService
  ) {}

  ngAfterViewInit(): void {
    if (this.colorType) {
      const hexColor = this.pokemonColorService.getColor(this.colorType);
      this.element.nativeElement.style.backgroundColor = `${hexColor}`;
      this.element.nativeElement.style.borderRadius = '5px';
    }
  }
}
