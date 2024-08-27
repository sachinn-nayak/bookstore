import { Request, Response } from "express";
import BookRepository from "../../../repositories/BookRepository";
import BaseUseCase from "../../BaseUseCase";
import { successMessages } from "../../../domain/constants/messages/successMessages";
import { Op } from "sequelize";

class GetAllBookUseCase extends BaseUseCase {
    private bookRepository: BookRepository;

    constructor(
        request: Request,
        response: Response,
        bookRepository: BookRepository
    ) {
        super(request, response);
        this.request = request;
        this.response = response;
        this.bookRepository = bookRepository;
    }

    public async execute(): Promise<ResponseModel.ResponseWithData> {
        let responseBody: ResponseModel.ResponseWithData;

        try {
            await this.authenticateAdmin();

            let { searchKey, index, size, sortingKey, sortingValue } = this.request.query;

            const pageSize = parseInt(size as string);
            const pageIndex = parseInt(index as string);

            let paginate;
            if (pageIndex && pageSize) {
                paginate = !searchKey
                    ? {
                        offset: (pageIndex - 1) * pageSize,
                        limit: pageSize,
                    }
                    : {};
            }

            const searchQuery = this.getSearchQuery(searchKey);
            let searchQueries = searchKey ? { [Op.or]: searchQuery } : {};
            let sorting = sortingKey && sortingValue ? [[sortingKey, sortingValue]] : []

            let books = await this.bookRepository.findAll({
                where: { ...searchQueries },
                ...paginate,
                order: sorting
            });

            if (!books) books = [];

            responseBody = {
                code: 200,
                message: successMessages.BOOK_FETCHED_SUCCESSFULLY,
                data: books,
            };

            return responseBody;
        } catch (error) {
            throw error;
        }
    }

    public getSearchQuery(searchKey) {
        const searchQuery = { [Op.iLike]: "%" + searchKey + "%" };
        const queries: any[] = [
            { title: searchQuery },
            { author: searchQuery },
            { description: searchQuery },
        ];
        return queries;
    }

    public static get(request: Request, response: Response) {
        const getAllBookUseCase = new GetAllBookUseCase(
            request,
            response,
            new BookRepository()
        );

        return getAllBookUseCase;
    }
}

export default GetAllBookUseCase;
