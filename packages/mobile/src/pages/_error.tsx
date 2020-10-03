import { NextPage } from 'next';
import { WithTranslation } from 'next-i18next';
import React from 'react';
import NextI18N from '../i18n';

const { withTranslation } = NextI18N;

type ErrorPageProps = {
    statusCode: number;
};
type ErrorPageInitialProps = ErrorPageProps & {
    namespacesRequired: string[];
};

const Error: NextPage<ErrorPageProps & WithTranslation, ErrorPageInitialProps> = ({ statusCode, t }) => (
    <p>
        HM: {statusCode
            ? t('error-with-status', { statusCode })
            : t('error-without-status')}
    </p>
);

Error.getInitialProps = async ({ res, err }) => {
    let statusCode = null;
    if (res) {
        ({ statusCode } = res);
    } else if (err) {
        ({ statusCode } = err);
    }
    return {
        namespacesRequired: ['common'],
        statusCode
    };
};

export default withTranslation('common')(Error);