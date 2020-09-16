import Banner from 'components/Website/Banner';
import { NextPage } from 'next';
import React from 'react';
import NextI18N from '../i18n';

const { useTranslation } = NextI18N;

const IndexPage: NextPage = () => {

    const { t } = useTranslation();

    return (
        <div>
            <Banner />
        </div>
    );
};

IndexPage.getInitialProps = () => {
    return {
        namespacesRequired: ['common']
    };
};

export default IndexPage;