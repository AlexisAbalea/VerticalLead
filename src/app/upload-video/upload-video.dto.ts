export class UploadVideoDto {
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}

export class OptionVideoDto {
  labelButton?: string;
  buttonUrl?: string;

  constructor(labelButton: string, buttonUrl: string) {
    this.labelButton = labelButton;
    this.buttonUrl = buttonUrl;
  }
}
