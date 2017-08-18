import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { GUID } from 'yyf/random';
import { tagsDel } from '../redux/actions';
import { NAMESPACE_TAGS, TAGS_SET, STATUS_SUCCESS } from '../redux/types';

function tagsSetAction(result) {
  return {
    namespace: NAMESPACE_TAGS,
    type: TAGS_SET,
    status: STATUS_SUCCESS,
    result,
  };
}

function getTags(tags, includeTags = []) {
  return Object
    .values(tags)
    .reduce((result, children) => result.concat(children), [])
    .filter(tag => !includeTags.length || includeTags.includes(tag.type));
}

const HEAD_TAGS = ['title', 'meta', 'link', 'style'];

function mapHeadStateToProps({ tags, }) {
  return {
    headTags: getTags(tags, HEAD_TAGS),
  };
}

@connect(mapHeadStateToProps)
export class Head extends Component {

  render() {
    const { headTags } = this.props;
    return headTags;
  }
}

const BODY_TAGS = ['script'];

function mapBodyStateToProps({ tags, ...finalState }) {
  return {
    bodyTags: getTags(tags, BODY_TAGS),
    finalState,
  };
}

@connect(mapBodyStateToProps)
export class Body extends Component {

  render() {
    const { bodyTags, finalState, isServer } = this.props;
    const attaches = [];
    if (isServer) {
      attaches.push(<script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(finalState)};` }} />);
    }
    if (process.env.NODE_ENV === 'production') {
      attaches.push(<script src="/js/common.js" />);
    }

    return bodyTags.concat(attaches);
  }
}

@connect(({ tags }) => ({ tags }), { tagsSet: tagsSetAction, tagsDel })
export class Helm extends Component {

  static contextTypes = {
    store: object,
  };

  state = {
    id: GUID(),
  };

  updateTags = ({ tags, children, tagsSet }, { id }) => {
    const newTags = (Array.isArray(children) ? children : [children])
      .map(({ type, props: { children, ...otherProps } }, idx) => React.createElement(
          type,
          {
            key: `${id}_${idx}`,
            ...otherProps,
          },
          children,
        ));
    tagsSet({ ...tags, [id]: newTags });
  };

  componentWillMount() {
    this.updateTags(this.props, this.state);
  }

  componentWillUnmount() {
    const { tagsDel } = this.props;
    tagsDel(this.state.id);
  }

  render() {
    return null;
  }
}