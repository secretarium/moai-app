import { NextPage } from 'next';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NextI18N from '../i18n';

const { useTranslation, i18n, Link } = NextI18N;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16
    }
});

const IndexPage: NextPage = () => {

    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t('hello')} <span aria-label="Waving hand" role="img">👋</span></Text>
            <button
                type='button'
                onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')}
            >
                {t('change-locale')}
            </button>
            <Link href='/check' >Check</Link>
        </View>
    );
};

IndexPage.getInitialProps = () => {
    return {
        namespacesRequired: ['common']
    };
};

export default IndexPage;