export class ApiResponse<TModel = void> {
    constructor(
        public result: TModel
    ) {
    }
}