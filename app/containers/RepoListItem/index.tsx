/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { selectCurrentUser } from 'app/containers/App/selectors';

import ListItem from 'app/components/ListItem';
import IssueIcon from 'app/components/IssueIcon';
import A from 'app/components/A';

const styles = require('./styles.module.css');

interface IRepoListItemProps {
  item: any;
  currentUser?: string;
}

export class RepoListItem extends React.Component<IRepoListItemProps, {}> { // eslint-disable-line react/prefer-stateless-function
  public render() {
    const item = this.props.item;
    let nameprefix = '';

    // If the repository is owned by a different person than we got the data for
    // it's a fork and we should show the name of the owner
    if (item.owner.login !== this.props.currentUser) {
      nameprefix = `${item.owner.login}/`;
    }

    // Put together the content of the repository
    const content = (
      <div className={styles.linkWrapper}>
        <A
          className={styles.linkRepo}
          href={item.html_url}
          target="_blank"
        >
          {nameprefix + item.name}
        </A>
        <A
          className={styles.linkIssues}
          href={`${item.html_url}/issues`}
          target="_blank"
        >
          <IssueIcon className={styles.issueIcon} />
          {item.open_issues_count}
        </A>
      </div>
    );

    // Render the content into a list item
    return (
      <ListItem key={`repo-list-item-${item.full_name}`} item={content} />
    );
  }
}

export default connect(createSelector(
  selectCurrentUser(),
  (currentUser) => ({ currentUser }),
))(RepoListItem as any); // TODO: fix
