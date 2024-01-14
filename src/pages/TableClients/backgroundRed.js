function backgroundDescription(cli) {
  const currentDay = new Date();
  const alteredUpDate = 'updateAt' in cli && new Date(`
    ${cli.updateAt.slice(3, 5)}/
    ${cli.updateAt.slice(0, 2)}/
    ${cli.updateAt.slice(6, 10)}`);

  const altereDate = 'updateAt' in cli && new Date(`
    ${cli.date.slice(3, 5)}/
    ${cli.date.slice(0, 2)}/
    ${cli.date.slice(6, 10)}`);
  const initDate = Math.abs(altereDate - currentDay);
  const updateDate = Math.abs(currentDay - alteredUpDate);
  const finalyUpDate = Math.floor(updateDate / (1000 * 60 * 60 * 24));
  const finalyDate = Math.floor(initDate / (1000 * 60 * 60 * 24));
  const objectReturn = {
    finalyDate,
    finalyUpDate
  }
  return objectReturn;
}

export default backgroundDescription;
