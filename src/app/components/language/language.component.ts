import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { languageContstants as langConsts } from '../../constants/language.constants'

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  languages!: any;

  constructor(
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.languages = langConsts.LANGUAGES;
  }

  change(language: string): void {
    this.translate.use(language);
  }
}
