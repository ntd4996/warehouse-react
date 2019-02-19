export const toFlatList = (emailItems) => {
  if (!emailItems) {
    return [];
  }
  let list = [];
  for (let i = 0; i< emailItems.length; i++) {
    const item = addAssigneeItem(emailItems[i]);
    list.push(item);
    if (item.children) {
      item.children.forEach(child => {
        child.parentId = child.replyToId;
        list.push(child);
      });
    }
  }
  return list;
};

function addAssigneeItem(item) {
  return Object.assign({assigneeName: item.assignee.username}, item);;
};

export const toPageInfo = (response) => {
  const pageInfo = {};
  pageInfo.totalElements = response.totalElements;
  pageInfo.pageNumber = response.pageNumber;
  pageInfo.pageSize = response.pageSize;
  pageInfo.totalPages = response.totalPages;
  return pageInfo;
};

export const toObjFolder = (folderId) => {
  const objFolder = {};
  if (folderId !== undefined) {
    objFolder = {
      flgFolder: true,
      folderId: folderId,
    }
  } else {
    objFolder = {
      flgFolder: false,
      folderId: 0,
    }
  }
  return objFolder;
};

export const toSearchParam = (formValues) => {
  if (!formValues) {
    return '';
  }
  let params = '';
  for (const k in formValues) {
    if(formValues[k]) {
      if (params) {
        params += '&';
      }
      params += k;
      params += '=';
      params +=formValues[k];
    }
  }
  return params;
}
