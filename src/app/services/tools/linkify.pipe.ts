import {Pipe, PipeTransform} from '@angular/core';
import * as linkify from 'linkifyjs';
import plugin from './mention';
import * as linkifyString from 'linkifyjs/string';
plugin(linkify);
@Pipe({name: 'linkify'})
export class LinkifyPipe implements PipeTransform {

  transform(str: string): string {
    return str ? linkifyString(str, {target: '_system'}) : str;
  }
}
