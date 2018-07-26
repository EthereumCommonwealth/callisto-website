import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class LangSelector extends Component {
  state = {
    open: false,
    selected: '',
  };

  componentWillMount() {
    this.setState({ selected: this.props.defaultSelected });
  }

  setRouterPath(lang) {
    const { match } = this.props;
    switch (match.path) {
      case '/cold-staking/':
        return `/${lang}/cold-staking/`
      case '/smart-contract/':
        return `/${lang}/smart-contract/`
      case '/financial-report/':
        return `/${lang}/financial-report/`
      case '/blog/':
        return `/${lang}/blog/`
      case '/blog/post/:slug/':
        return `/${lang}/blog/post/${match.params.slug}/`
      case '/blog/topic/:slug/':
        return `/${lang}/blog/topic/${match.params.slug}/`
      case '/airdrop/':
        return `/${lang}/airdrop/`
      case '/faq/':
        return `/${lang}/faq/`
      case '/community-guidlines/':
        return `/${lang}/community-guidlines/`
      case '/:lang(es|en|id|ru|de|zh|it|ko|tr|vi|cs)/cold-staking/':
        return `/${lang}/cold-staking/`
      case '/:lang(es|en|id|ru|de|zh|it|ko|tr|vi|cs)/smart-contract/':
        return `/${lang}/smart-contract/`
      case '/:lang(es|en|id|ru|de|zh|it|ko|tr|vi|cs)/financial-report/':
        return `/${lang}/financial-report/`
      case '/:lang(es|en|id|ru|de|zh|it|ko|tr|vi|cs)/blog/':
        return `/${lang}/blog/`
      case '/:lang(es|en|id|ru|de|zh|it|ko|tr|vi|cs)/blog/post/:slug/':
        return `/${lang}/blog/post/${match.params.slug}/`
      case '/:lang(es|en|id|ru|de|zh|it|ko|tr|vi|cs)/blog/topic/:slug/':
        return `/${lang}/blog/topic/${match.params.slug}/`
      case '/:lang(es|en|id|ru|de|zh|it|ko|tr|vi|cs)/faq/':
        return `/${lang}/faq/`
      case '/:lang(es|en|id|ru|de|zh|it|ko|tr|vi|cs)/airdrop/':
        return `/${lang}/airdrop/`
      case '/:lang(es|en|id|ru|de|zh|it|ko|tr|vi|cs)/community-guidlines/':
        return `/${lang}/community-guidlines/`
      default:
        return `/${lang}/`;
    }
  }

  handleOpen = event => {
    event.preventDefault();
    this.setState({ open: !this.state.open });
  }

  closeMenu = event => {
    event.preventDefault();
    this.setState({ open: false });
  }

  handleSelect = (event, selection) => {
    event.preventDefault();
    this.setState({ selected: selection });
  }

  changeLocation = (event, route) => {
    event.preventDefault();
    document.location = route;
  }

  render() {
    const { selected, open } = this.state;
    const ListClass = classNames('LangSelector-list', { 'to-top': this.props.toTop });
    return (
      <div className='LangSelector' onClick={this.handleOpen} onMouseLeave={this.closeMenu}>
        <div className='LangSelector-selected'>
          <span className='LangSelector-selected-text'>
            <img
              src={`/image/country-flags/${selected}.png`}
              className='LangSelector-flag'
            /> {selected} {open ?
              <i className='fas fa-angle-up' /> : <i className='fas fa-angle-down' />
            }
          </span>
        </div>
        {open ?
          (
            <ul className={ListClass}>
              {this.props.langList.map((elem, index) => {
                if (elem !== selected) {
                  return (
                    <li
                      key={`LangSelector-${index}`}
                      className='LangSelector-list-elem'
                    >
                      <a
                        className='LangSelector-list-elem-anchor'
                        onClick={(e => this.changeLocation(e, this.setRouterPath(elem)))}
                        target='blank'
                      >
                        <img
                          src={`/image/country-flags/${elem}.png`}
                          className='LangSelector-flag'
                        /> {elem}
                      </a>
                    </li>
                  )
                }
                return null
              })}
            </ul>
          ) : null
        }
      </div>
    );
  }
}

LangSelector.propTypes = {
  defaultSelected: PropTypes.string,
  toTop: PropTypes.bool,
  match: PropTypes.object,
};

export default withRouter(LangSelector);
