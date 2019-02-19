// mock tableListDataSource
let tableListDataSource = [];
for (let i = 1; i < 10; i += 1) {
  tableListDataSource.push({
    key: i,
    name: `${i}`,
    title: `Team ${i}`,
    desc: `This Team Representative for description follow Team ${i}`,
    status: 'Enabled',
  });
}

tableListDataSource.push({
  key: 10,
  name: `10`,
  title: `Team 10`,
  desc: 'This Team Representative for description follow Team 10',
  status: 'Disabled',
});
export const tableData = tableListDataSource;