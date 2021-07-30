declare namespace ServerlessDevsReport {
  export interface Domain {
    domain: string;
    weight?: number;
  }
  export interface ReportData {
    name: string;
    access: string;
    content: Domain;
  }
}
