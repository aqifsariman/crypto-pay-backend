export default async function dateRangeConverter(dateRange) {
  let dateArray = JSON.parse(dateRange).start_date.split("/");

  let newDate = dateArray[1] + "/" + dateArray[0] + "/" + dateArray[2];

  const d = new Date(newDate);
  let month = d.getMonth();
  let year = d.getFullYear();

  return { month, year };
}
