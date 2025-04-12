import {debounce} from 'lodash';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {shadow} from 'utils/mixins';
import {COLORS, SPACING} from 'utils/styleGuide';
import { useTranslation } from 'react-i18next';

type IProps = {
  onSearch: (val: string) => void;
};
const HeaderSearch: FC<IProps> = ({onSearch}) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>('');

  const debounceOnChangeSearch = useCallback(
    debounce(() => {
      onSearch(search);
    }, 500),
    [search],
  );

  useEffect(() => {
    if (search.length >= 2) {
      debounceOnChangeSearch();
    }
  }, [search]);

  const onChangeText = (val: string) => {
    setSearch(val);
    if (val.length === 0) {
      debounceOnChangeSearch?.cancel();
    }
  };

  const onSubmitSearch = () => {
    if (search.length > 3) {
      debounceOnChangeSearch();
      Keyboard.dismiss();
    }
  };
  return (
    <Searchbar
      placeholder={t('location.search')}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitSearch}
      value={search}
      iconColor={COLORS.primary}
      style={{
        ...shadow('low', false),
        margin: SPACING.s_12,
        borderRadius: 10,
      }}
    />
  );
};
export default HeaderSearch;
