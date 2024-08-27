import BookModel from "../domain/schemas/book-model/BookModel";
import BaseRepository from "./BaseRepository";

class BookRepository extends BaseRepository {
    constructor() {
        super();
    }
    public model() {
        return BookModel;
    }
}   
export default BookRepository;