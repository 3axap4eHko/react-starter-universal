import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { renderToStaticMarkup } from 'react-dom/server';
import { connect } from 'react-redux';
import { tagsDel } from '../redux/actions';
import { NAMESPACE_TAGS, TAGS_SET, STATUS_SUCCESS } from '../redux/types';

let index = 0;

function guid() {
  return ++index;
}

function tagsSetAction(result) {
  return {
    namespace: NAMESPACE_TAGS,
    type: TAGS_SET,
    status: STATUS_SUCCESS,
    result,
  };
}

function groupTags(tags, mapper = v => v) {
  return Object.keys(tags)
    .reduce((result, id) => {
      const children = tags[id];
      children.forEach((child, idx) => {
        if (!result[child.type]) {
          result[child.type] = '';
        }
        result[child.type] += `${mapper(child, id, idx)}\n`;
      });
      return result;
    }, {
      title: '',
      meta: '',
      link: '',
      style: '',
      base: '',
      script: '',
    });
}

@connect(({ tags, app }) => ({ tags, app }), { tagsSet: tagsSetAction, tagsDel })
export class Helm extends Component {

  state = {
    id: guid(),
  };

  componentWillMount() {
    const { tags, children, tagsSet } = this.props;
    const { id } = this.state;

    const elements = (Array.isArray(children) ? children : [children])
      .map(({ type, props: { children, ...otherProps } }, idx) => React.createElement(
        type,
        {
          id: `${id}_${idx}`,
          key: `${id}_${idx}`,
          [`data-helm-id`]: id,
          ...otherProps,
        },
        children,
      ));
    tagsSet({ ...tags, [id]: elements });

    if (typeof document !== 'undefined') {
      elements
        .filter(tag => !document.getElementById(tag.props.id))
        .forEach(tag => {
          const element = document.createElement(tag.type);
          switch (tag.type) {
            case 'script':
              document.body.appendChild(element);
              break;
            default:
              document.head.appendChild(element);
          }
          element.outerHTML = renderToStaticMarkup(tag);
        });
    }
  }

  componentWillUnmount() {
    const { tagsDel } = this.props;
    if (typeof document !== 'undefined') {
      Array
        .from(document.querySelectorAll(`[data-helm-id="${this.state.id}"]`))
        .forEach(element => {
          element.parentNode.removeChild(element);
        });
    }
    tagsDel(this.state.id);
  }

  render() {
    return null;
  }
}

export function renderStatic(store) {
  const { tags } = store.getState();
  return groupTags(tags, tag => renderToStaticMarkup(tag));
}
