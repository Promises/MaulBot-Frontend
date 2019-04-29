import {Pipe, PipeTransform} from '@angular/core';
import * as linkify from 'linkifyjs';
import plugin from './mention';
import * as linkifyString from 'linkifyjs/string';
import {MarkdownParserService} from '../markdown-parser/markdown-parser.service';

plugin(linkify);

@Pipe({name: 'linkify'})
export class LinkifyPipe implements PipeTransform {
  constructor(private  mdService: MarkdownParserService) {
  }

  transform(str: string): string {
    const txt = this.mdService.convert(str);
    console.log(txt);
    return txt;
    // return txt ? linkifyString(txt, {target: '_system'}) : txt;
  }

}
