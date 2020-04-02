import React from 'react';
import { useTranslation } from 'react-i18next';

function PageNotFound(props) {
    const { t } = useTranslation();
    return (
        <div>
            <h1>{t('pageNotFoundHeader')}</h1>
            <p>{t('pageNotFoundText1')}<a href="/">{t('pageNotFoundText2')}</a>.</p>
        </div>
    );
}

export default PageNotFound;