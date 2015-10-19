import React, {PropTypes} from 'react';
import {Component, buildQueryAndVariables} from 'relax-framework';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import queryProps from '../../decorators/query-props';
import * as menusActions from '../../client/actions/menus';
import Menus from '../../components/admin/panels/menus';

@connect(
  (state) => ({
    menus: state.menus.data.items,
    count: state.menus.data.count
  }),
  (dispatch) => bindActionCreators(menusActions, dispatch)
)
@queryProps({
  page: 1,
  limit: 3
})
export default class MenusContainer extends Component {
  static fragments = Menus.fragments

  static propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    menus: PropTypes.array,
    query: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    hasQueryChanged: PropTypes.bool.isRequired,
    queryVariables: PropTypes.object.isRequired,
    removeMenu: PropTypes.func.isRequired,
    duplicateMenu: PropTypes.func.isRequired
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.hasQueryChanged) {
      const vars = {
        menus: {
          ...nextProps.queryVariables
        }
      };

      nextProps
        .getAdmin(buildQueryAndVariables(
          this.constructor.fragments,
          vars
        ))
        .done();
    }
  }

  static panelSettings = {
    activePanelType: 'menus',
    breadcrumbs: [
      {
        label: 'Menus'
      }
    ]
  }

  render () {
    return (
      <Menus
        {...this.props}
        {...this.state}
      />
    );
  }
}
