export interface IQuestionModel {
  id: number;
  text: string;
}
export interface IDocumentModel {
  id: number;
  title: string;
  content: string;
  questions?: IQuestionModel[];
}
