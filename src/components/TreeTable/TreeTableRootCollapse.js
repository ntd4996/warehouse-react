import React from 'react';
import {flatListToTree} from './utils/tree.util';
import {createRows} from './utils/tree-table-root-collapse.util';
import { Spin } from "antd";

class TreeTableRootCollapse extends React.Component {
    static defaultProps = {
        items: [],
        closeAll: true,
    };

    constructor(props) {
        super(props);

        this.state = {
            toggleMap: {}
        };
    }

    closeAll = () => {
        const items = {...this.props.items};
        const toggleMap = {};
        for (let i in items) {
            const item = items[i];
            if (!item.parentId) {
              toggleMap[item.id + '-'] = true;
            }
        }
        this.setState({toggleMap});
    };

    openAll = () => {
      const items = {...this.props.items};
      const toggleMap = {};
      for (let i in items) {
        const item = items[i];
        if (!item.parentId) {
          toggleMap[item.id + '-'] = false;
        }
      }
      this.setState({toggleMap});
    };

    onToggleClick = (toggleId, e) => {
        const toggleMap = {...this.state.toggleMap};
        toggleMap[toggleId] = !toggleMap[toggleId];
        this.setState({toggleMap});
        console.log(toggleId, toggleMap[toggleId]);
        e.stopPropagation();
    };

    render() {
        let counterMap = {};
        const roots = flatListToTree(this.props.items);
        const columns = this.props.columns.map(col => {
            return (
                <th
                    key={col.key}
                    style={{width: (col.style || {}).width}}
                >{col.name}</th>
            );
        });

        let rows = [];
        for (let i = 0; i < roots.length; i++) {
            const row = roots[i];
            createRows(rows,
                this.props.columns,
                row,
                0,
                '',
                this.onToggleClick,
                this.state.toggleMap,
                counterMap,
                this.props.closeAll,
                this.props.rowClick);
        }

        return(
            <div className="tree-table-wrap">
              <Spin spinning={this.props.loading}>

                  <table className="tree-table">
                    <thead>
                    <tr>
                      {columns}
                    </tr>
                    </thead>
                    <tbody>
                      {
                        (rows.length > 0) &&
                        rows
                      }
                      {
                        (rows.length === 0) &&
                        <tr>
                          <td colSpan={columns.length} style={{textAlign: 'center', padding: '20px 0', cursor: 'default'}}>No record found</td>
                        </tr>
                      }
                    </tbody>
                  </table>
              </Spin>
            </div>
        );
    }
}

export default TreeTableRootCollapse;
