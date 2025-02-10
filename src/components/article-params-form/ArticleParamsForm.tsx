import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useState, useRef, useEffect } from 'react';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleParams: {
		fontFamilyOption: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
		fontSizeOption: OptionType;
	};
	setArticleParams: React.Dispatch<
		React.SetStateAction<ArticleParamsFormProps['articleParams']>
	>;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	articleParams,
	setArticleParams,
}) => {
	const [click, setClick] = useState(false);

	const [tempParams, setTempParams] = useState(articleParams);
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setClick(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		setTempParams(articleParams);
	}, [articleParams]);

	const handleChange = (
		key: keyof ArticleParamsFormProps['articleParams'],
		value: OptionType
	) => {
		setTempParams((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleParams(tempParams);
	};

	const handleReset = () => {
		setTempParams({ ...articleParams });
	};

	return (
		<>
			<ArrowButton isOpen={click} onClick={() => setClick((prev) => !prev)} />
			<aside
				className={`${styles.container} ${click ? styles.container_open : ''}`}
				ref={formRef}>
				<form className={styles.form} onSubmit={handleApply}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={tempParams.fontFamilyOption}
						onChange={(value) => handleChange('fontFamilyOption', value)}
						options={fontFamilyOptions}
						title='Шрифт'></Select>
					<RadioGroup
						selected={tempParams.fontSizeOption}
						name='radio'
						onChange={(value) => handleChange('fontSizeOption', value)}
						options={fontSizeOptions}
						title='Размер шрифта'></RadioGroup>
					<Select
						selected={tempParams.fontColor}
						onChange={(value) => handleChange('fontColor', value)}
						options={fontColors}
						title='Цвет шрифта'></Select>
					<Separator></Separator>
					<Select
						selected={tempParams.backgroundColor}
						onChange={(value) => handleChange('backgroundColor', value)}
						options={backgroundColors}
						title='Цвет фона'></Select>
					<Select
						selected={tempParams.contentWidth}
						onChange={(value) => handleChange('contentWidth', value)}
						options={contentWidthArr}
						title='Ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
