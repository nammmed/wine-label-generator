export const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name') || '',
        year: parseInt(params.get('year')) || new Date().getFullYear(),
        style: params.get('style') || 'classic elegant',
        sugar: parseFloat(params.get('sugar')) || '',
        alcohol: parseFloat(params.get('alcohol')) || '',
        grapes: params.get('grapes') || ''
    };
};

export const updateUrlParams = (data) => {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
        if (typeof value !== "undefined") params.set(key, value);
    });
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
};