export const noResultsGet = data => {
    return data && data.length < 1;
};

export const noResultsPut = data => {
    return data && data.affectedRows < 1;
}
