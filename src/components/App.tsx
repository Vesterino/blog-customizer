import { CSSProperties, useState } from 'react';

import { defaultArticleState } from 'src/constants/articleProps';
import { ArticleParamsForm } from './article-params-form/ArticleParamsForm';
import { Article } from './article/Article';

import styles from '../styles/index.module.scss';
import '../styles/index.scss';

export const App = () => {
	const [articleParams, setArticleParams] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleParams.fontFamilyOption.value,
					'--font-size': articleParams.fontSizeOption.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleParams={defaultArticleState}
				setArticleParams={setArticleParams}
			/>
			<Article />
		</main>
	);
};
