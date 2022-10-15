export interface IProgressEvent {
  percentage: number;
}

export interface ProgressListener {
  (event: IProgressEvent): void;
}
