import React from 'react';

export const createRows = (rows, columns, currentRow, level, path, toggleFn, toggleMap, counterMap, isCloseAll, rowClick) => {
	let pathArr = path.split('-').filter(item => item !== '').map(item => parseInt(item));
	path += currentRow.id + '-';

	if (!currentRow.parentId && toggleMap[path] === undefined) {
    toggleMap[path] = isCloseAll;
	}

	let isDisplay = true;
	let isOpen = true;
	for (let key in toggleMap) {
		if (toggleMap[key] === true) {
			if (path.startsWith(key) && path !== key) {
				isDisplay = false;
			}
			if (path === key) {
				isOpen = false;
			}
		}
	}

	let rowTds = columns.map((col, index) => {
		let startOfRow = [];
		if (index === 0) {
      if (!!!currentRow.parentId && currentRow.children) {
        let btnToggleClassName = 'tree-table-space-block btn-toggle';
        if (!isOpen) {
          btnToggleClassName += ' is-close';
        }
        let btnToggle = <span
          key={'btn-toggle'}
          className={btnToggleClassName}
          onClick={(e) => toggleFn(path, e)}
        >{isOpen ? '-' : '+'}</span>;
        startOfRow.push(btnToggle);
      } else {
        startOfRow.push(<span key={index} className="tree-table-space-block hidden"><i /></span>);
			}
    }
		if (col.showTreeLine) {

			for (let x in pathArr) {
        const isLineHidden = (counterMap[pathArr[x]] || 0) === (counterMap[pathArr[x]+'-children-count'] || 0);
        const isLastLine = (counterMap[pathArr[x]] || 0) === (counterMap[pathArr[x]+'-children-count'] || 0) - 1;
        const isFirstLine = (counterMap[pathArr[x]+'-children-count'] || 0) > 0 && (counterMap[pathArr[x]] || 0) === 0;
				startOfRow.push(<span key={x} className={ 'tree-table-space-block' + (isLineHidden ? ' hidden' : '') + (isLastLine ? ' last' : '') + (isFirstLine ? ' first' : '')} ><i /></span>);
			}
			if (!!!currentRow.parentId && currentRow.children) {
				startOfRow.push(<span key={'last-block'} className="tree-table-space-block last-block"><i /></span>);
			} else {
				startOfRow.push(<span key={'last-block'} className="tree-table-space-block last-block"><i /></span>);
			}
		}
		let renderContent;
		if (col.render) {
			renderContent = col.render(currentRow);
		} else {
            renderContent = currentRow[col.key]
		}

		const tdContent = <span className={'tree-table-td-content'}>{renderContent}</span>;
		return (
			<td
				key={col.key}
        style={col.style}
				className={col.showTreeLine ? 'display-tree-line' : ''}
			>{startOfRow}{tdContent}</td>
		);
	});
	const tableRow = isDisplay && <tr onClick={() => rowClick(currentRow)} key={currentRow.id}>{rowTds}</tr>;
	rows.push(tableRow);


    if (!!currentRow.parentId) {
        let nodeCreated = counterMap[currentRow.parentId] || 0;
        counterMap[currentRow.parentId] = nodeCreated + 1;
    }

	if (!currentRow.children) {
		return;
	}

    counterMap[currentRow.id + '-children-count'] = currentRow.children.length;

	level++;
	for (let i = 0; i < currentRow.children.length; i++) {
		const row = currentRow.children[i];
		createRows(rows, columns, row, level, path, toggleFn, toggleMap, counterMap, isCloseAll, rowClick);
	}
};
