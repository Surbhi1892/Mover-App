/* eslint-disable camelcase */
import {useEffect, useRef, useState} from 'react';

const LIMIT = 20;
const SORT = 'DESC';

export default (load, dataKey) => {
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState([]);

    const currentPage = useRef(0);
    const lastPage = useRef(2);

    const loadMore = async () => {
        if (isFetching) return;
        const nextPage = currentPage.current + 1;
        if (nextPage <= lastPage.current) {
            setIsFetching(true);
            const params = `?lang_id=1&limit=${LIMIT}&sort=${SORT}&page=${nextPage}`;
            try {
                const response = await load(params);
                const {
                    data: newData,
                    current_page,
                    last_page,
                } = response.data[dataKey];
                currentPage.current = current_page;
                lastPage.current = last_page;
                setData((prevState) => [...prevState, ...newData]);
            } catch (e) {
                setIsFetching(false);
            } finally {
                setIsFetching(false);
            }
        }
    };

    useEffect(() => {
        loadMore();
    }, []);

    const refresh = async () => {
        currentPage.current = 0;
        lastPage.current = 2;
        const nextPage = currentPage.current + 1;
        if (nextPage <= lastPage.current) {
            setIsFetching(true);
            const params = `?lang_id=1&limit=${LIMIT}&sort=${SORT}&page=${nextPage}`;
            try {
                const response = await load(params);
                const {
                    data: newData,
                    current_page,
                    last_page,
                } = response.data[dataKey];
                currentPage.current = current_page;
                lastPage.current = last_page;
                setData(newData);
            } catch (e) {
                setIsFetching(false);
            } finally {
                setIsFetching(false);
            }
        }
    };

    return [data, isFetching, loadMore, refresh];
};
