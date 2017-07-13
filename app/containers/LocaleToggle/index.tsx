/*
 *
 * LanguageToggle
 *
 */

import * as React from 'react';

import { connect } from 'react-redux';
import { selectLocale } from '../LanguageProvider/selectors';
import { changeLocale } from '../LanguageProvider/actions';
import { appLocales } from '../../i18n';
import { createSelector } from 'reselect';
const styles = require('./styles.module.css');
import messages from './messages';
import Toggle from 'app/components/Toggle';

interface IProps {
  onLocaleToggle?: (e: any) => any;
}

export class LocaleToggle extends React.Component<IProps, {}> {
  public render() {
    return (
      <div className={styles.localeToggle}>
        <Toggle values={appLocales} messages={messages} onToggle={this.props.onLocaleToggle} />
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  selectLocale(),
  (locale) => ({ locale }),
);

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: (evt) => dispatch(changeLocale(evt.target.value)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle as any); // TODO: fix when using normal import for `connect`
