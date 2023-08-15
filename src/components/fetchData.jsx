export default async function fetchData(api) {
    try {
      const data = await fetch(api);
      const response = await data.json();
      return response;
    } catch (error) {
      return Promise.reject(new Error(error.message));
    }
  }