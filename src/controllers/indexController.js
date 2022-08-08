const indexController = (req,res,next)=> {
    const result = {
        _data: {
            message: 'Server Up'
        }
    };
    next(result);
}

export {indexController};