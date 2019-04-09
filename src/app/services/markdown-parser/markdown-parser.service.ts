import {Injectable} from '@angular/core';
import * as marked from 'marked'
import {HighlightJS} from 'ngx-highlightjs';

@Injectable({
  providedIn: 'root'
})
export class MarkdownParserService {

  private md: any;

  constructor(private hljs: HighlightJS) {
    this.md = marked;
    var renderer = new this.md.Renderer();

    // Override function
    renderer.heading = function (text, level) {
      var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

      return `
          <h${level}>
            <a name="${escapedText}" class="anchor" href="#${escapedText}">
              <span class="header-link"></span>
            </a>
            ${text}
          </h${level}>`;
    };

    this.md.setOptions({
      highlight: function (code, lang) {
        return hljs.highlightAuto(code, [lang]).value;
      },
      renderer: renderer,
      gfm: true,
      breaks: true
    });
  }

  convert(markdown: string) {
    return marked.parse(markdown)
  }
}
