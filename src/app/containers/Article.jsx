import React, { Component } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { withService } from 'react-service';
import { articleLoad } from '../redux/actions';

@withService({
  contextTypes: {
    store: object,
  },
  service: ({ match }, { store }) => {
    const { article } = store.getState();

    if (article.id !== match.params.article) {
      return store.dispatch(articleLoad(match.params.article));
    }
  },
})
@connect(({ article }) => ({ article }))
export default class Article extends Component {

  static propTypes = {
    article: object,
  };

  static defaultProps = {
    article: {},
  };

  render() {
    const { article } = this.props;
    return (
      <div>
        <h1>{article.title}</h1>
        <div>{article.content}</div>
      </div>
    );
  }
}
