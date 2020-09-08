import HttpException from './HttpException';

class TagNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Tag with id ${id} not found`);
    }
}

export default TagNotFoundException;
