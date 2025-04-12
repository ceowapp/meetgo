import { STACK_NAVIGATOR } from 'navigation/types';
import { useTranslation } from 'react-i18next';

export const useAccountMenu = () => {
  const { t } = useTranslation();
  return [
    {
      label: t('account.meetHistory'),
      route: STACK_NAVIGATOR.HISTORY_MEET,
      icon: 'map-marker-distance',
    },
    {
      label: t('account.transactionHistory'),
      route: STACK_NAVIGATOR.HISTORY_POINT,
      icon: 'magnify-expand',
    },
    {
      label: t('account.earningHistory'),
      route: STACK_NAVIGATOR.HISTORY_EARN,
      icon: 'clock-fast',
      hasDivider: true,
    },
    {
      label: t('account.guideline'),
      route: STACK_NAVIGATOR.WEB_VIEW,
      icon: 'file-document-multiple-outline',
      url: 'https://meetgo.vn/huong-dan-su-dung',
    },
    {
      label: t('account.privacyPolicy'),
      route: STACK_NAVIGATOR.WEB_VIEW,
      icon: 'newspaper-variant-outline',
      url: 'https://meetgo.vn/chinh-sach-bao-mat',
    },
    {
      label: t('account.termsAndConditions'),
      route: STACK_NAVIGATOR.WEB_VIEW,
      icon: 'lock-outline',
      url: 'https://meetgo.vn/chinh-sach-quy-dinh-chung',
      hasDivider: true,
    },
    {
      label: t('account.manageAccount'),
      route: STACK_NAVIGATOR.MANAGE_ACC,
      icon: 'account-details-outline',
      hasDivider: true,
    },
    {
      label: t('account.languageSetting'),
      route: STACK_NAVIGATOR.LANGUAGE_SETTING,
      icon: 'web',
    },
  ];
};


