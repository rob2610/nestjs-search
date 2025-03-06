//todo: fare una classe.
// export type Image = Pick<ISerperImage, 'title' | 'imageUrl' | 'imageWidth' | 'imageHeight'>;

import { ISerperImage } from '../serperApi/serper.model';

export class Image {
  title: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  constructor(iSerperImage: ISerperImage) {
    this.title = iSerperImage.title;
    this.imageUrl = iSerperImage.imageUrl;
    this.imageWidth = iSerperImage.imageWidth;
    this.imageHeight = iSerperImage.imageHeight;
  }
}

export class ImageList{
  images: Image[];
  nextPage?: number;
  constructor(images: Image[], nextPage?: number) {
    this.images = images;
    this.nextPage = nextPage || undefined;
  }
}