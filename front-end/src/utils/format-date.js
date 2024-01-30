export const formatDate = (date) => {
    const dateTime = `${date}T00:00:00`;
    const dateObj = new Date(dateTime);
  
    return dateObj.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };