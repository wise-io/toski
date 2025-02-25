import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { Button, Flex } from '@chakra-ui/react';

import { Error } from '../Error';
import { Articles } from '../../articles/Articles';

export async function loader(data: { params: any }) {
    return data.params.newsId;
}

export const NewsDetail = React.memo(function NewsDetail() {
    const articleId = useLoaderData() as string;
    const navigate = useNavigate();

    // get the article
    const article = Articles[articleId];

    if (article === undefined) {
        return <Error error={'Something went wrong! Try again later.'} />;
    }

    const navigateToNews = () => {
        navigate('/news');
    };

    return (
        <Flex flexDirection='column' alignItems='center' paddingBottom='16'>
            <Flex flexDirection='column' maxWidth='750'>
                <h1 style={{ fontSize: 12 }}>{article.date}</h1>
                <h1 style={{ fontSize: 30, fontWeight: 'bold' }}>
                    {article.title}
                </h1>
                <div style={{ marginTop: 16 }}>{article.content}</div>
                <Button
                    variant='ghost'
                    flex={1}
                    padding={1}
                    size='lg'
                    alignSelf={'flex-end'}
                    marginTop='16'
                    marginRight='1'
                    flexDirection='row'
                    onClick={navigateToNews}
                >
                    <Flex alignItems='center'>
                        <FiArrowLeft />
                        <h1>Back to News</h1>
                    </Flex>
                </Button>
            </Flex>
        </Flex>
    );
});
