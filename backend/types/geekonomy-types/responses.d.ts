declare namespace ResponseModel {
    interface Response {
      code: number;
      message: string;
    }
  
    interface ResponseWithData extends Response {
      data: [];
    }
  }
  