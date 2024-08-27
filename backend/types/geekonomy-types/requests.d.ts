declare namespace RequestModel {
    interface CreateBook {
      name: string;
      author: string;
      description: string;
      yearOfPublication: string;
    }
  
    interface RequestModelWithId {
      id: number;
    }
  
    interface authentication{
      email: string
      password: string
    }
  }
  