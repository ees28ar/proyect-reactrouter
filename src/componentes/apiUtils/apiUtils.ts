async function fetchData<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  export default fetchData;
  