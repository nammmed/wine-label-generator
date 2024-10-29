import {useState, useEffect} from 'react';
import {getUrlParams, updateUrlParams} from '../utils/urlParams';

export const useWineForm = () => {
    const [formData, setFormData] = useState(getUrlParams());

    useEffect(() => {
        updateUrlParams(formData);
    }, [formData]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return {formData, setFormData, handleChange};
};