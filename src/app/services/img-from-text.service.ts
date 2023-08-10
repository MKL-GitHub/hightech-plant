import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImgFromTextService {
  private BASE_URL = 'https://ui-avatars.com';

  /**
   * Генерирует url картинки из текста
   * @param {String} str текст
   * @returns {String} url ссылка в виде строки
   */
  generate(str: string): string {
    const params = new URLSearchParams();
    params.append('name', str);

    return this.BASE_URL + '/api/?' + params;
  }
}
