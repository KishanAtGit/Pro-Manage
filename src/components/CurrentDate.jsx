export default function CurrentDate() {
  const today = new Date();

  const day = today.getDate();
  const month = today.toLocaleString('default', { month: 'short' });
  const year = today.getFullYear();

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

  const formattedDate = `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;

  return (
    <div style={{ color: '#707070', fontWeight: '500' }}>{formattedDate}</div>
  );
}
