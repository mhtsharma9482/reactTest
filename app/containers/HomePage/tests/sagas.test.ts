/**
 * Tests for HomePage sagas
 */

import * as expect from 'expect';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getRepos, getReposWatcher, githubData } from '../sagas';

import { LOAD_REPOS } from 'app/containers/App/constants';
import { reposLoaded, repoLoadingError } from 'app/containers/App/actions';

import request from 'app/utils/request';
import { selectUsername } from 'app/containers/HomePage/selectors';
import { Action } from 'redux';

const username = 'mxstbr';

describe('getRepos Saga', () => {
  let getReposGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getReposGenerator = getRepos();

    const selectDescriptor = getReposGenerator.next().value;
    expect(selectDescriptor).toEqual(select(selectUsername()));

    const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
    const callDescriptor = getReposGenerator.next(username).value;
    expect(callDescriptor).toEqual(call(request, requestURL));
  });

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    const response = {
      data: [{
        name: 'First repo',
      }, {
        name: 'Second repo',
      }],
    };
    const putDescriptor = getReposGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(reposLoaded(response.data, username)));
  });

  it('should call the repoLoadingError action if the response errors', () => {
    const response = {
      err: 'Some error',
    };
    const putDescriptor = getReposGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(repoLoadingError(response.err)));
  });
});

describe('getReposWatcher Saga', () => {
  const getReposWatcherGenerator = getReposWatcher();

  it('should watch for LOAD_REPOS action', () => {
    const takeDescriptor = getReposWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(take(LOAD_REPOS));
  });

  it('should invoke getRepos saga on actions', () => {
    const callDescriptor = getReposWatcherGenerator.next(put(LOAD_REPOS as any as Action)).value; // TODO: investigate typing of put action
    expect(callDescriptor).toEqual(call(getRepos));
  });
});

describe('githubDataSaga Saga', () => {
  const githubDataSaga = githubData();

  let forkDescriptor;

  it('should asyncronously fork getReposWatcher saga', () => {
    forkDescriptor = githubDataSaga.next();
    expect(forkDescriptor.value).toEqual(fork(getReposWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = githubDataSaga.next();
    expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
  });

  it('should finally cancel() the forked getReposWatcher saga',
    function* githubDataSagaCancellable() { // tslint:disable-line:only-arrow-functions
      // reuse open fork for more integrated approach
      forkDescriptor = githubDataSaga.next(put(LOCATION_CHANGE as any as Action)); // TODO: investigate typing of put action
      expect(forkDescriptor.value).toEqual(cancel(forkDescriptor));
    },
  );
});
