// export const pagination = ({ limit = 100, page = 1 }) => {
//     const validatedLimit = ('NaN' === Math.abs(limit).toString()) ? 100 : Math.abs(parseInt(limit)),
//         validatedPage = ('NaN' === Math.abs(page).toString() || parseInt(page) === 0) ? 1 : Math.abs(parseInt(page)),
//         offset = (Math.abs(validatedPage) - 1) * validatedLimit;
//     return ` LIMIT ${validatedLimit} OFSET ${offset} `;
// };

export const pagination = ({limit = 100, page = 1}) => {
    const validateLimit = 'NaN' === Math.abs(limit).toString() ? 100 : limit;
    const validatePage = 'NaN' === Math.abs(page).toString() ? 1 : page;

    const auxPage = 0 ===  parseInt(validatePage) ? 1 : parseInt(validatePage);
    const auxLimit = Math.abs(parseInt(validateLimit));

    const offset = (Math.abs(auxPage) - 1) * auxLimit;
    return ` LIMIT ${auxLimit} OFFSET ${offset} `
};
