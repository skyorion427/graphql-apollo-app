import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

const InjectMassage = ({ id, ...props }: { id: string }) => (
  <FormattedMessage id={id} {...props} />
);

export default injectIntl(InjectMassage, {
  withRef: false,
});
