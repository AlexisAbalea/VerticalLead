export class UploadVideoDto {
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}

export class OptionVideoDto {
  labelButton?: string;
  buttonUrl?: string;
  buttonPosition?: string;

  buttonColor?: string;

  constructor(labelButton: string, buttonUrl: string, buttonPosition: string, buttonColor: string) {
    this.labelButton = labelButton;
    this.buttonUrl = buttonUrl;
    this.buttonPosition = buttonPosition;
    this.buttonColor = buttonColor;
  }
}
