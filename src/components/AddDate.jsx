export default function AddDate({ forComponent, date }) {
  const getOrdinalSuffix = day => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const getCurrentDate = date => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
  };

  const getDueDate = dateStr => {
    const date = new Date(dateStr);
    const options = { month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const day = date.getDate();

    return `${formattedDate}${getOrdinalSuffix(day)}`;
  };

  return (
    <>{forComponent === 'board' ? getCurrentDate(date) : getDueDate(date)}</>
  );
}
