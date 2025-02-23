export function getTotalDaysInMonth(year: number, month:number) {
    const date = new Date(year, month - 1, 1);
  
    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() - 1);
  
    return date.getDate();
  }
  
  export function generateRandomId(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }
  
    return randomId;
  }
  
  export function convertDate(dateString: string) {
    const parts = dateString.split('-');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return new Date(formattedDate);
  }